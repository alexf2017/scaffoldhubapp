import { zodResolver } from '@hookform/resolvers/zod';
import { WorkflowStep } from '@prisma/client';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { LuLoader2 } from 'react-icons/lu';
import * as React from 'react';
import { useForm } from 'react-hook-form';
import { WorkflowStepWithRelationships } from 'src/features/workflowStep/workflowStepSchemas';
import {
  workflowStepCreateApiCall,
  workflowStepUpdateApiCall,
} from 'src/features/workflowStep/workflowStepApiCalls';
import { AppContext } from 'src/shared/controller/appContext';
import { Button } from 'src/shared/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from 'src/shared/components/ui/form';
import { toast } from 'src/shared/components/ui/use-toast';
import { getZodErrorMap } from 'src/translation/getZodErrorMap';
import { z } from 'zod';
import { workflowStepCreateInputSchema } from 'src/features/workflowStep/workflowStepSchemas';
import { Input } from 'src/shared/components/ui/input';
import { Switch } from 'src/shared/components/ui/switch';
import { StepsAutocompleteInput } from 'src/features/steps/components/StepsAutocompleteInput';
import { WorkflowAutocompleteInput } from 'src/features/workflow/components/WorkflowAutocompleteInput';
import { MembershipAutocompleteInput } from 'src/features/membership/components/MembershipAutocompleteInput';
import { LivrableAutocompleteInput } from 'src/features/livrable/components/LivrableAutocompleteInput';

export function WorkflowStepForm({
  workflowStep,
  context,
  onSuccess,
  onCancel,
}: {
  onCancel: () => void;
  onSuccess: (workflowStep: WorkflowStepWithRelationships) => void;
  workflowStep?: Partial<WorkflowStepWithRelationships>;
  context: AppContext;
}) {
  const { locale, dictionary } = context;

  const queryClient = useQueryClient();

  z.setErrorMap(getZodErrorMap(locale));

  const isEditing = Boolean(workflowStep?.id);

  const [initialValues] = React.useState({
    order: workflowStep?.order || '',
    responsible: workflowStep?.responsible || null,
    observer: workflowStep?.observer || null,
    livrable: workflowStep?.livrable || null,
    steptitle: workflowStep?.steptitle || null,
    workFlow: workflowStep?.workFlow || null,
    isDone: workflowStep?.isDone || false,
  });

  const form = useForm({
    resolver: zodResolver(workflowStepCreateInputSchema),
    mode: 'onSubmit',
    defaultValues: initialValues,
  });

  const mutation = useMutation({
    mutationFn: (data: z.input<typeof workflowStepCreateInputSchema>) => {
      if (workflowStep?.id) {
        return workflowStepUpdateApiCall(workflowStep.id, data);
      } else {
        return workflowStepCreateApiCall(data);
      }
    },
    onSuccess: (workflowStep: WorkflowStep) => {
      queryClient.invalidateQueries({
        queryKey: ['workflowStep'],
      });

      onSuccess(workflowStep);

      toast({
        description: isEditing
          ? dictionary.workflowStep.edit.success
          : dictionary.workflowStep.new.success,
      });
    },
    onError: (error: Error) => {
      toast({
        description: error.message || dictionary.shared.errors.unknown,
        variant: 'destructive',
      });
    },
  });

  const onSubmit = (data: any) => {
    mutation.mutateAsync(data);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={(e) => {
          e.stopPropagation();
          form.handleSubmit(onSubmit)(e);
        }}
      >
        <div className="grid w-full gap-8">
          <div className="grid max-w-lg gap-1">
            <FormField
              control={form.control}
              name="order"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="required">
                    {dictionary.workflowStep.fields.order}
                  </FormLabel>

                  <Input
                    type="number"
                    disabled={mutation.isPending || mutation.isSuccess}
                    autoFocus
                    {...field}
                  />

                  {dictionary.workflowStep.hints.order ? (
                    <FormDescription>
                      {dictionary.workflowStep.hints.order}
                    </FormDescription>
                  ) : null}

                  <FormMessage data-testid="order-error" />
                </FormItem>
              )}
            />
          </div>
          <div className="grid max-w-lg gap-1">
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
                    disabled={mutation.isPending || mutation.isSuccess}
                    mode="memory"
                  />

                  {dictionary.workflowStep.hints.responsible ? (
                    <FormDescription>
                      {dictionary.workflowStep.hints.responsible}
                    </FormDescription>
                  ) : null}

                  <FormMessage data-testid="responsible-error" />
                </FormItem>
              )}
            />
          </div>
          <div className="grid max-w-lg gap-1">
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
                    disabled={mutation.isPending || mutation.isSuccess}
                    mode="memory"
                  />

                  {dictionary.workflowStep.hints.observer ? (
                    <FormDescription>
                      {dictionary.workflowStep.hints.observer}
                    </FormDescription>
                  ) : null}

                  <FormMessage data-testid="observer-error" />
                </FormItem>
              )}
            />
          </div>
          <div className="grid max-w-lg gap-1">
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
                    disabled={mutation.isPending || mutation.isSuccess}
                    mode="memory"
                  />

                  {dictionary.workflowStep.hints.livrable ? (
                    <FormDescription>
                      {dictionary.workflowStep.hints.livrable}
                    </FormDescription>
                  ) : null}

                  <FormMessage data-testid="livrable-error" />
                </FormItem>
              )}
            />
          </div>
          <div className="grid max-w-lg gap-1">
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
                    disabled={mutation.isPending || mutation.isSuccess}
                    mode="memory"
                  />

                  {dictionary.workflowStep.hints.steptitle ? (
                    <FormDescription>
                      {dictionary.workflowStep.hints.steptitle}
                    </FormDescription>
                  ) : null}

                  <FormMessage data-testid="steptitle-error" />
                </FormItem>
              )}
            />
          </div>
          <div className="grid max-w-lg gap-1">
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
                    disabled={mutation.isPending || mutation.isSuccess}
                    mode="memory"
                  />

                  {dictionary.workflowStep.hints.workFlow ? (
                    <FormDescription>
                      {dictionary.workflowStep.hints.workFlow}
                    </FormDescription>
                  ) : null}

                  <FormMessage data-testid="workFlow-error" />
                </FormItem>
              )}
            />
          </div>
          <div className="grid max-w-lg gap-1">
            <FormField
              control={form.control}
              name="isDone"
              render={({ field }) => (
                <FormItem>
                  <div className="flex items-center space-x-2">
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                        disabled={mutation.isPending || mutation.isSuccess}
                      />
                    </FormControl>
                    <FormLabel>
                      {dictionary.workflowStep.fields.isDone}
                    </FormLabel>
                  </div>

                  {dictionary.workflowStep.hints.isDone ? (
                    <FormDescription>
                      {dictionary.workflowStep.hints.isDone}
                    </FormDescription>
                  ) : null}

                  <FormMessage data-testid="isDone-error" />
                </FormItem>
              )}
            />
          </div>

          <div className="flex gap-2">
            <Button
              disabled={mutation.isPending || mutation.isSuccess}
              type="submit"
            >
              {(mutation.isPending || mutation.isSuccess) && (
                <LuLoader2 className="mr-2 h-4 w-4 animate-spin" />
              )}
              {dictionary.shared.save}
            </Button>

            <Button
              disabled={mutation.isPending || mutation.isSuccess}
              type="button"
              variant={'secondary'}
              onClick={onCancel}
            >
              {dictionary.shared.cancel}
            </Button>
          </div>
        </div>
      </form>
    </Form>
  );
}
