import { Projet } from '@prisma/client';
import { useState } from 'react';
import { LuFileEdit, LuPlus } from 'react-icons/lu';
import { projetAutocompleteApiCall } from 'src/features/projet/projetApiCalls';
import { projetLabel } from 'src/features/projet/projetLabel';
import { ProjetFormSheet } from 'src/features/projet/components/ProjetFormSheet';
import { permissions } from 'src/features/permissions';
import { hasPermission } from 'src/features/security';
import { AppContext } from 'src/shared/controller/appContext';
import AutocompleteInput from 'src/shared/components/form/AutocompleteInput';
import { Button } from 'src/shared/components/ui/button';

export function ProjetAutocompleteInput({
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
  onChange: (value: Partial<Projet> | undefined | null) => void;
  value?: Partial<Projet> | null;
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
    permissions.projetCreate,
    context,
  );
  const hasPermissionToEdit = hasPermission(
    permissions.projetUpdate,
    context,
  );

  const queryFn = (
    search?: string,
    exclude?: Array<string>,
    signal?: AbortSignal,
  ) => {
    return projetAutocompleteApiCall(
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
          queryId={['projet', 'autocomplete']}
          isClearable={isClearable}
          labelFn={projetLabel}
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
        <ProjetFormSheet
          onCancel={() => setIsFormOpen(false)}
          onSuccess={(projet) => {
            setIsFormOpen(false);
            onChange(projet);
          }}
          context={context}
          projet={value ? value : undefined}
        />
      )}
    </div>
  );
}
