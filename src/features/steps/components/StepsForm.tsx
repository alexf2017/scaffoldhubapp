import { zodResolver } from '@hookform/resolvers/zod';
import { Steps } from '@prisma/client';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { LuLoader2 } from 'react-icons/lu';
import * as React from 'react';
import { useForm } from 'react-hook-form';
import { StepsWithRelationships } from 'src/features/steps/stepsSchemas';
import {
  stepsCreateApiCall,
  stepsUpdateApiCall,
} from 'src/features/steps/stepsApiCalls';
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
import { stepsCreateInputSchema } from 'src/features/steps/stepsSchemas';
import { Input } from 'src/shared/components/ui/input';

export function StepsForm({
  steps,
  context,
  onSuccess,
  onCancel,
}: {
  onCancel: () => void;
  onSuccess: (steps: StepsWithRelationships) => void;
  steps?: Partial<StepsWithRelationships>;
  context: AppContext;
}) {
  const { locale, dictionary } = context;

  const queryClient = useQueryClient();

  z.setErrorMap(getZodErrorMap(locale));

  const isEditing = Boolean(steps?.id);

  const [initialValues] = React.useState({
    title: steps?.title || '',
  });

  const form = useForm({
    resolver: zodResolver(stepsCreateInputSchema),
    mode: 'onSubmit',
    defaultValues: initialValues,
  });

  const mutation = useMutation({
    mutationFn: (data: z.input<typeof stepsCreateInputSchema>) => {
      if (steps?.id) {
        return stepsUpdateApiCall(steps.id, data);
      } else {
        return stepsCreateApiCall(data);
      }
    },
    onSuccess: (steps: Steps) => {
      queryClient.invalidateQueries({
        queryKey: ['steps'],
      });

      onSuccess(steps);

      toast({
        description: isEditing
          ? dictionary.steps.edit.success
          : dictionary.steps.new.success,
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
                    {dictionary.steps.fields.title}
                  </FormLabel>

                  <Input
                    disabled={mutation.isPending || mutation.isSuccess}
                    autoFocus
          {...field}
                  />

                  {dictionary.steps.hints.title ? (
                    <FormDescription>
                      {dictionary.steps.hints.title}
                    </FormDescription>
                  ) : null}

                  <FormMessage data-testid="title-error" />
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
