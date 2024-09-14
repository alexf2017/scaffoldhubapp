import { zodResolver } from '@hookform/resolvers/zod';
import { Comment } from '@prisma/client';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { LuLoader2 } from 'react-icons/lu';
import * as React from 'react';
import { useForm } from 'react-hook-form';
import { CommentWithRelationships } from 'src/features/comment/commentSchemas';
import {
  commentCreateApiCall,
  commentUpdateApiCall,
} from 'src/features/comment/commentApiCalls';
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
import { commentCreateInputSchema } from 'src/features/comment/commentSchemas';
import { Input } from 'src/shared/components/ui/input';
import { WorkflowStepAutocompleteInput } from 'src/features/workflowStep/components/WorkflowStepAutocompleteInput';

export function CommentForm({
  comment,
  context,
  onSuccess,
  onCancel,
}: {
  onCancel: () => void;
  onSuccess: (comment: CommentWithRelationships) => void;
  comment?: Partial<CommentWithRelationships>;
  context: AppContext;
}) {
  const { locale, dictionary } = context;

  const queryClient = useQueryClient();

  z.setErrorMap(getZodErrorMap(locale));

  const isEditing = Boolean(comment?.id);

  const [initialValues] = React.useState({
    context: comment?.context || '',
    workflowstepid: comment?.workflowstepid || null,
  });

  const form = useForm({
    resolver: zodResolver(commentCreateInputSchema),
    mode: 'onSubmit',
    defaultValues: initialValues,
  });

  const mutation = useMutation({
    mutationFn: (data: z.input<typeof commentCreateInputSchema>) => {
      if (comment?.id) {
        return commentUpdateApiCall(comment.id, data);
      } else {
        return commentCreateApiCall(data);
      }
    },
    onSuccess: (comment: Comment) => {
      queryClient.invalidateQueries({
        queryKey: ['comment'],
      });

      onSuccess(comment);

      toast({
        description: isEditing
          ? dictionary.comment.edit.success
          : dictionary.comment.new.success,
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
              name="context"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    {dictionary.comment.fields.context}
                  </FormLabel>

                  <Input
                    disabled={mutation.isPending || mutation.isSuccess}
                    autoFocus
          {...field}
                  />

                  {dictionary.comment.hints.context ? (
                    <FormDescription>
                      {dictionary.comment.hints.context}
                    </FormDescription>
                  ) : null}

                  <FormMessage data-testid="context-error" />
                </FormItem>
              )}
            />
          </div>
          <div className="grid max-w-lg gap-1">
            <FormField
              control={form.control}
              name="workflowstepid"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{dictionary.comment.fields.workflowstepid}</FormLabel>

                  <WorkflowStepAutocompleteInput
                    context={context}
                    onChange={field.onChange}
                    value={field.value}
                    isClearable={true}
                    disabled={mutation.isPending || mutation.isSuccess}
                    mode="memory"
                  />

                  {dictionary.comment.hints.workflowstepid ? (
                    <FormDescription>
                      {dictionary.comment.hints.workflowstepid}
                    </FormDescription>
                  ) : null}

                  <FormMessage data-testid="workflowstepid-error" />
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
