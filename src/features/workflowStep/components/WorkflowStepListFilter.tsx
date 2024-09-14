import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { LuLoader2, LuSearch } from 'react-icons/lu';
import { RxReset } from 'react-icons/rx';
import { workflowStepFilterFormSchema } from 'src/features/workflowStep/workflowStepSchemas';
import { cn } from 'src/shared/components/cn';
import FilterPreview from 'src/shared/components/dataTable/DataTableFilterPreview';
import { DataTableQueryParams } from 'src/shared/components/dataTable/DataTableQueryParams';
import { dataTableFilterRenders } from 'src/shared/components/dataTable/dataTableFilterRenders';
import { Button } from 'src/shared/components/ui/button';
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from 'src/shared/components/ui/form';
import { AppContext } from 'src/shared/controller/appContext';
import { getZodErrorMap } from 'src/translation/getZodErrorMap';
import { z } from 'zod';
import RangeInput from 'src/shared/components/form/RangeInput';
import { membershipLabel } from 'src/features/membership/membershipLabel';
import { MembershipAutocompleteInput } from 'src/features/membership/components/MembershipAutocompleteInput';
import { livrableLabel } from 'src/features/livrable/livrableLabel';
import { LivrableAutocompleteInput } from 'src/features/livrable/components/LivrableAutocompleteInput';
import { stepsLabel } from 'src/features/steps/stepsLabel';
import { StepsAutocompleteInput } from 'src/features/steps/components/StepsAutocompleteInput';
import { workflowLabel } from 'src/features/workflow/workflowLabel';
import { WorkflowAutocompleteInput } from 'src/features/workflow/components/WorkflowAutocompleteInput';
import SelectInput from 'src/shared/components/form/SelectInput';

const emptyValues = {
  orderRange: [],
  isDone: '',
  steptitle: null,
  workFlow: null,
  observer: null,
  responsible: null,
  livrable: null,
};

function WorkflowStepListFilter({
  context,
  isLoading,
}: {
  context: AppContext;
  isLoading: boolean;
}) {
  const { dictionary, locale } = context;
  const router = useRouter();
  const searchParams = useSearchParams();
  const [expanded, setExpanded] = useState(false);

  z.setErrorMap(getZodErrorMap(locale));

  const previewRenders = {
    orderRange: {
      label: dictionary.workflowStep.fields.order,
      render: dataTableFilterRenders(context).range(),
    },
    isDone: {
      label: dictionary.workflowStep.fields.isDone,
      render: dataTableFilterRenders(context).boolean(),
    },
    steptitle: {
      label: dictionary.workflowStep.fields.steptitle,
      render: dataTableFilterRenders(context).relationToOne(stepsLabel),
    },
    workFlow: {
      label: dictionary.workflowStep.fields.workFlow,
      render: dataTableFilterRenders(context).relationToOne(workflowLabel),
    },
    observer: {
      label: dictionary.workflowStep.fields.observer,
      render: dataTableFilterRenders(context).relationToOne(membershipLabel),
    },
    responsible: {
      label: dictionary.workflowStep.fields.responsible,
      render: dataTableFilterRenders(context).relationToOne(membershipLabel),
    },
    livrable: {
      label: dictionary.workflowStep.fields.livrable,
      render: dataTableFilterRenders(context).relationToOne(livrableLabel),
    },
  };

  const filter = useMemo(
    () =>
      DataTableQueryParams.getFilter<z.infer<typeof workflowStepFilterFormSchema>>(
        searchParams,
        workflowStepFilterFormSchema,
      ),
    [searchParams],
  );

  const form = useForm({
    resolver: zodResolver(workflowStepFilterFormSchema),
    mode: 'onSubmit',
    defaultValues: filter,
  });

  useEffect(() => {
    form.reset({ ...emptyValues, ...filter } as z.infer<
      typeof workflowStepFilterFormSchema
    >);
  }, [filter, form]);

  const onRemove = (key: string) => {
    DataTableQueryParams.onFilterChange(
      { ...filter, [key]: undefined },
      router,
      searchParams,
    );
  };

  const onSubmit = (data: any) => {
    DataTableQueryParams.onFilterChange(data, router, searchParams);
    setExpanded(false);
  };

  const doReset = () => {
    DataTableQueryParams.onFilterChange({}, router, searchParams);
    setExpanded(false);
  };

  return (
    <div className="rounded-md border">
      <FilterPreview
        onClick={() => {
          setExpanded(!expanded);
        }}
        renders={previewRenders}
        values={filter}
        expanded={expanded}
        onRemove={onRemove}
        dictionary={dictionary}
      />
      <div className={cn(expanded ? 'block' : 'hidden', 'p-4')}>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <FormField
                control={form.control}
                name="orderRange"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{dictionary.workflowStep.fields.order}</FormLabel>
                    <RangeInput
                      type="number"
                      dictionary={dictionary}
                      disabled={isLoading}
                      onChange={field.onChange}
                      value={field.value}
                    />
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="responsible"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{dictionary.workflowStep.fields.responsible}</FormLabel>
                    <MembershipAutocompleteInput
                      context={context}
                      onChange={field.onChange}
                      value={field.value}
                      isClearable={true}
                      disabled={isLoading}
                      hideFormButton={true}
                      mode="memory"
                    />
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="observer"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{dictionary.workflowStep.fields.observer}</FormLabel>
                    <MembershipAutocompleteInput
                      context={context}
                      onChange={field.onChange}
                      value={field.value}
                      isClearable={true}
                      disabled={isLoading}
                      hideFormButton={true}
                      mode="memory"
                    />
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="livrable"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{dictionary.workflowStep.fields.livrable}</FormLabel>
                    <LivrableAutocompleteInput
                      context={context}
                      onChange={field.onChange}
                      value={field.value}
                      isClearable={true}
                      disabled={isLoading}
                      hideFormButton={true}
                      mode="memory"
                    />
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="steptitle"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{dictionary.workflowStep.fields.steptitle}</FormLabel>
                    <StepsAutocompleteInput
                      context={context}
                      onChange={field.onChange}
                      value={field.value}
                      isClearable={true}
                      disabled={isLoading}
                      hideFormButton={true}
                      mode="memory"
                    />
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="workFlow"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{dictionary.workflowStep.fields.workFlow}</FormLabel>
                    <WorkflowAutocompleteInput
                      context={context}
                      onChange={field.onChange}
                      value={field.value}
                      isClearable={true}
                      disabled={isLoading}
                      hideFormButton={true}
                      mode="memory"
                    />
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="isDone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      {dictionary.workflowStep.fields.isDone}
                    </FormLabel>
                    <SelectInput
                      options={[
                        {
                          label: dictionary.shared.yes,
                          value: 'true',
                        },
                        {
                          label: dictionary.shared.no,
                          value: 'false',
                        },
                      ]}
                      dictionary={dictionary}
                      isClearable={true}
                      disabled={isLoading}
                      onChange={field.onChange}
                      value={field.value}
                    />
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="mt-4 flex justify-end gap-2">
              <Button disabled={isLoading} type="submit" size={'sm'}>
                {isLoading ? (
                  <LuLoader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <LuSearch className="mr-2 h-4 w-4" />
                )}
                {dictionary.shared.search}
              </Button>

              <Button
                disabled={isLoading}
                type="button"
                variant={'secondary'}
                onClick={doReset}
                size={'sm'}
              >
                <RxReset className="mr-2 h-4 w-4" />
                {dictionary.shared.reset}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}

export default WorkflowStepListFilter;

