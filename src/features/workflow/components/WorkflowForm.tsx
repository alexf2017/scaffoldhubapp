import { zodResolver } from '@hookform/resolvers/zod';
import { Workflow } from '@prisma/client';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { LuLoader2 } from 'react-icons/lu';
import * as React from 'react';
import { useForm } from 'react-hook-form';
import { WorkflowWithRelationships } from 'src/features/workflow/workflowSchemas';
import {
  workflowCreateApiCall,
  workflowUpdateApiCall,
} from 'src/features/workflow/workflowApiCalls';
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
import { workflowCreateInputSchema } from 'src/features/workflow/workflowSchemas';
import { Input } from 'src/shared/components/ui/input';
import { StepsAutocompleteMultipleInput } from 'src/features/steps/components/StepsAutocompleteMultipleInput';

export function WorkflowForm({
  workflow,
  context,
  onSuccess,
  onCancel,
}: {
  onCancel: () => void;
  onSuccess: (workflow: WorkflowWithRelationships) => void;
  workflow?: Partial<WorkflowWithRelationships>;
  context: AppContext;
}) {
  const { locale, dictionary } = context;

  const queryClient = useQueryClient();

  z.setErrorMap(getZodErrorMap(locale));

  const isEditing = Boolean(workflow?.id);

  const [initialValues] = React.useState({
    title: workflow?.title || '',
    steps: workflow?.steps || [],
  });

  const form = useForm({
    resolver: zodResolver(workflowCreateInputSchema),
    mode: 'onSubmit',
    defaultValues: initialValues,
  });

  const mutation = useMutation({
    mutationFn: (data: z.input<typeof workflowCreateInputSchema>) => {
      if (workflow?.id) {
        return workflowUpdateApiCall(workflow.id, data);
      } else {
        return workflowCreateApiCall(data);
      }
    },
    onSuccess: (workflow: Workflow) => {
      queryClient.invalidateQueries({
        queryKey: ['workflow'],
      });

      onSuccess(workflow);

      toast({
        description: isEditing
          ? dictionary.workflow.edit.success
          : dictionary.workflow.new.success,
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
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="required">
                    {dictionary.workflow.fields.title}
                  </FormLabel>

                  <Input
                    disabled={mutation.isPending || mutation.isSuccess}
                    autoFocus
          {...field}
                  />

                  {dictionary.workflow.hints.title ? (
                    <FormDescription>
                      {dictionary.workflow.hints.title}
                    </FormDescription>
                  ) : null}

                  <FormMessage data-testid="title-error" />
                </FormItem>
              )}
            />
          </div>
          <div className="grid max-w-lg gap-1">
            <FormField
              control={form.control}
              name="steps"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{dictionary.workflow.fields.steps}</FormLabel>

                  <StepsAutocompleteMultipleInput
                    context={context}
                    onChange={field.onChange}
                    value={field.value}
                    disabled={mutation.isPending || mutation.isSuccess}
                    mode="memory"
                  />

                  {dictionary.workflow.hints.steps ? (
                    <FormDescription>
                      {dictionary.workflow.hints.steps}
                    </FormDescription>
                  ) : null}

                  <FormMessage data-testid="steps-error" />
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
