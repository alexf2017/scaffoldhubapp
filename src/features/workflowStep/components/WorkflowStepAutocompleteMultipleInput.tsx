import { WorkflowStep } from '@prisma/client';
import { useState } from 'react';
import { LuPlus } from 'react-icons/lu';
import { workflowStepAutocompleteApiCall } from 'src/features/workflowStep/workflowStepApiCalls';
import { workflowStepLabel } from 'src/features/workflowStep/workflowStepLabel';
import { WorkflowStepFormSheet } from 'src/features/workflowStep/components/WorkflowStepFormSheet';
import { permissions } from 'src/features/permissions';
import { hasPermission } from 'src/features/security';
import { AppContext } from 'src/shared/controller/appContext';
import AutocompleteMultipleInput from 'src/shared/components/form/AutocompleteMultipleInput';
import { Button } from 'src/shared/components/ui/button';

export function WorkflowStepAutocompleteMultipleInput({
  onChange,
  value,
  context,
  selectPlaceholder,
  searchPlaceholder,
  notFoundPlaceholder,
  mode,
  disabled,
  hideFormButton,
}: {
  onChange: (value: Array<Partial<WorkflowStep>> | undefined | null | []) => void;
  value?: Array<Partial<WorkflowStep>> | null | [];
  selectPlaceholder?: string;
  searchPlaceholder?: string;
  notFoundPlaceholder?: string;
  mode: 'memory' | 'async';
  disabled?: boolean;
  context: AppContext;
  hideFormButton?: boolean;
}) {
  const [isFormOpen, setIsFormOpen] = useState(false);

  const hasPermissionToCreate = hasPermission(
    permissions.workflowStepCreate,
    context,
  );

  const queryFn = (
    search?: string,
    exclude?: Array<string>,
    signal?: AbortSignal,
  ) => {
    return workflowStepAutocompleteApiCall(
      {
        search,
        exclude,
        take: mode === 'async' ? 10 : undefined,
      },
      signal,
    );
  };

  return (
    <div className="flex w-full gap-1">
      <div className="flex-1">
        <AutocompleteMultipleInput
          queryFn={queryFn}
          dictionary={context.dictionary}
          queryId={['workflowStep', 'autocomplete']}
          labelFn={workflowStepLabel}
          notFoundPlaceholder={notFoundPlaceholder}
          onChange={onChange}
          searchPlaceholder={searchPlaceholder}
          selectPlaceholder={selectPlaceholder}
          value={value}
          mode={mode}
          disabled={disabled}
        />
      </div>

      {hasPermissionToCreate && !hideFormButton && (
        <Button
          type="button"
          variant="secondary"
          size={'icon'}
          onClick={() => setIsFormOpen(true)}
          title={context.dictionary.shared.new}
          disabled={disabled}
        >
          <LuPlus className="h-4 w-4" />
        </Button>
      )}

      {isFormOpen && (
        <WorkflowStepFormSheet
          onCancel={() => setIsFormOpen(false)}
          onSuccess={(workflowStep) => {
            setIsFormOpen(false);
            onChange([...(value || []), workflowStep]);
          }}
          context={context}
        />
      )}
    </div>
  );
}
