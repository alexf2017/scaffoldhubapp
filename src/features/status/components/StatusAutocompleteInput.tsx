import { Status } from '@prisma/client';
import { useState } from 'react';
import { LuFileEdit, LuPlus } from 'react-icons/lu';
import { statusAutocompleteApiCall } from 'src/features/status/statusApiCalls';
import { statusLabel } from 'src/features/status/statusLabel';
import { StatusFormSheet } from 'src/features/status/components/StatusFormSheet';
import { permissions } from 'src/features/permissions';
import { hasPermission } from 'src/features/security';
import { AppContext } from 'src/shared/controller/appContext';
import AutocompleteInput from 'src/shared/components/form/AutocompleteInput';
import { Button } from 'src/shared/components/ui/button';

export function StatusAutocompleteInput({
  onChange,
  value,
  selectPlaceholder,
  searchPlaceholder,
  notFoundPlaceholder,
  isClearable,
  mode,
  disabled,
  context,
  hideFormButton,
  dataTestid,
}: {
  onChange: (value: Partial<Status> | undefined | null) => void;
  value?: Partial<Status> | null;
  selectPlaceholder?: string;
  searchPlaceholder?: string;
  notFoundPlaceholder?: string;
  isClearable?: boolean;
  mode: 'memory' | 'async';
  disabled?: boolean;
  context: AppContext;
  hideFormButton?: boolean;
  dataTestid?: string;
}) {
  const [isFormOpen, setIsFormOpen] = useState(false);

  const hasPermissionToCreate = hasPermission(
    permissions.statusCreate,
    context,
  );
  const hasPermissionToEdit = hasPermission(
    permissions.statusUpdate,
    context,
  );

  const queryFn = (
    search?: string,
    exclude?: Array<string>,
    signal?: AbortSignal,
  ) => {
    return statusAutocompleteApiCall(
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
        <AutocompleteInput
          queryFn={queryFn}
          dictionary={context.dictionary}
          queryId={['status', 'autocomplete']}
          isClearable={isClearable}
          labelFn={statusLabel}
          notFoundPlaceholder={notFoundPlaceholder}
          onChange={onChange}
          searchPlaceholder={searchPlaceholder}
          selectPlaceholder={selectPlaceholder}
          value={value}
          mode={mode}
          disabled={disabled}
          dataTestid={dataTestid}
        />
      </div>

      {hasPermissionToCreate && !value && !hideFormButton && (
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

      {hasPermissionToEdit && Boolean(value) && !hideFormButton && (
        <Button
          type="button"
          variant="secondary"
          size={'icon'}
          onClick={() => setIsFormOpen(true)}
          title={context.dictionary.shared.edit}
          disabled={disabled}
        >
          <LuFileEdit className="h-4 w-4" />
        </Button>
      )}

      {isFormOpen && (
        <StatusFormSheet
          onCancel={() => setIsFormOpen(false)}
          onSuccess={(status) => {
            setIsFormOpen(false);
            onChange(status);
          }}
          context={context}
          status={value ? value : undefined}
        />
      )}
    </div>
  );
}
