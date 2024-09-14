import { zodResolver } from '@hookform/resolvers/zod';
import { Status } from '@prisma/client';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { LuLoader2 } from 'react-icons/lu';
import * as React from 'react';
import { useForm } from 'react-hook-form';
import { StatusWithRelationships } from 'src/features/status/statusSchemas';
import {
  statusCreateApiCall,
  statusUpdateApiCall,
} from 'src/features/status/statusApiCalls';
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
import { statusCreateInputSchema } from 'src/features/status/statusSchemas';
import { Input } from 'src/shared/components/ui/input';

export function StatusForm({
  status,
  context,
  onSuccess,
  onCancel,
}: {
  onCancel: () => void;
  onSuccess: (status: StatusWithRelationships) => void;
  status?: Partial<StatusWithRelationships>;
  context: AppContext;
}) {
  const { locale, dictionary } = context;

  const queryClient = useQueryClient();

  z.setErrorMap(getZodErrorMap(locale));

  const isEditing = Boolean(status?.id);

  const [initialValues] = React.useState({
    name: status?.name || '',
  });

  const form = useForm({
    resolver: zodResolver(statusCreateInputSchema),
    mode: 'onSubmit',
    defaultValues: initialValues,
  });

  const mutation = useMutation({
    mutationFn: (data: z.input<typeof statusCreateInputSchema>) => {
      if (status?.id) {
        return statusUpdateApiCall(status.id, data);
      } else {
        return statusCreateApiCall(data);
      }
    },
    onSuccess: (status: Status) => {
      queryClient.invalidateQueries({
        queryKey: ['status'],
      });

      onSuccess(status);

      toast({
        description: isEditing
          ? dictionary.status.edit.success
          : dictionary.status.new.success,
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
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="required">
                    {dictionary.status.fields.name}
                  </FormLabel>

                  <Input
                    disabled={mutation.isPending || mutation.isSuccess}
                    autoFocus
          {...field}
                  />

                  {dictionary.status.hints.name ? (
                    <FormDescription>
                      {dictionary.status.hints.name}
                    </FormDescription>
                  ) : null}

                  <FormMessage data-testid="name-error" />
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
