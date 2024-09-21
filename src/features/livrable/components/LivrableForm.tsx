import { zodResolver } from '@hookform/resolvers/zod';
import { Livrable } from '@prisma/client';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { LuLoader2 } from 'react-icons/lu';
import * as React from 'react';
import { useForm } from 'react-hook-form';
import { LivrableWithRelationships } from 'src/features/livrable/livrableSchemas';
import {
  livrableCreateApiCall,
  livrableUpdateApiCall,
} from 'src/features/livrable/livrableApiCalls';
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
import { livrableCreateInputSchema } from 'src/features/livrable/livrableSchemas';
import { Input } from 'src/shared/components/ui/input';
import { FilesInput } from 'src/features/file/components/FilesInput';
import { storage } from 'src/features/storage';
import { ProjetAutocompleteInput } from 'src/features/projet/components/ProjetAutocompleteInput';
import { StatusAutocompleteInput } from 'src/features/status/components/StatusAutocompleteInput';

export function LivrableForm({
  livrable,
  context,
  onSuccess,
  onCancel,
  roleName, // Add roleName as a prop

}: {
  onCancel: () => void;
  onSuccess: (livrable: LivrableWithRelationships) => void;
  livrable?: Partial<LivrableWithRelationships>;
  context: AppContext;
  roleName?: string; // Add roleName type

}) {
  const { locale, dictionary } = context;

  const queryClient = useQueryClient();

  const isEmployer = roleName?.toLowerCase() === 'employer'; // Ensure it's compared correctly

  z.setErrorMap(getZodErrorMap(locale));

  const isEditing = Boolean(livrable?.id);

  const [initialValues] = React.useState({
    title: livrable?.title || '',
    document: livrable?.document || [],
    projet: livrable?.projet || null,
    statusname: livrable?.statusname || null,
  });

  const form = useForm({
    resolver: zodResolver(livrableCreateInputSchema),
    mode: 'onSubmit',
    defaultValues: initialValues,
  });

  const mutation = useMutation({
    mutationFn: (data: z.input<typeof livrableCreateInputSchema>) => {
      if (livrable?.id) {
        return livrableUpdateApiCall(livrable.id, data);
      } else {
        return livrableCreateApiCall(data);
      }
    },
    onSuccess: (livrable: Livrable) => {
      queryClient.invalidateQueries({
        queryKey: ['livrable'],
      });

      onSuccess(livrable);

      toast({
        description: isEditing
          ? dictionary.livrable.edit.success
          : dictionary.livrable.new.success,
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
                    {dictionary.livrable.fields.title}
                  </FormLabel>

                  <Input
                    disabled={isEmployer || mutation.isPending || mutation.isSuccess}
                    autoFocus
                    {...field}
                  />

                  {dictionary.livrable.hints.title ? (
                    <FormDescription>
                      {dictionary.livrable.hints.title}
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
              name="document"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    {dictionary.livrable.fields.document}
                  </FormLabel>

                  <div>
                    <FilesInput
                      onChange={field.onChange}
                      value={field.value}
                      dictionary={dictionary}
                      storage={storage.livrableDocument}
                      disabled={mutation.isPending || mutation.isSuccess}
                    />
                  </div>

                  {dictionary.livrable.hints.document ? (
                    <FormDescription>
                      {dictionary.livrable.hints.document}
                    </FormDescription>
                  ) : null}

                  <FormMessage data-testid="document-error" />
                </FormItem>
              )}
            />
          </div>
          <div className="grid max-w-lg gap-1">
            <FormField
              control={form.control}
              name="projet"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{dictionary.livrable.fields.projet}</FormLabel>

                  <ProjetAutocompleteInput
                    context={context}
                    onChange={field.onChange}
                    value={field.value}
                    isClearable={true}
                    disabled={isEmployer || mutation.isPending || mutation.isSuccess}
                    mode="memory"
                  />

                  {dictionary.livrable.hints.projet ? (
                    <FormDescription>
                      {dictionary.livrable.hints.projet}
                    </FormDescription>
                  ) : null}

                  <FormMessage data-testid="projet-error" />
                </FormItem>
              )}
            />
          </div>
          <div className="grid max-w-lg gap-1">
            <FormField
              control={form.control}
              name="statusname"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="required">{dictionary.livrable.fields.statusname}</FormLabel>

                  <StatusAutocompleteInput
                    context={context}
                    onChange={field.onChange}
                    value={field.value}
                    isClearable={true}
                    disabled={isEmployer || mutation.isPending || mutation.isSuccess}
                    mode="memory"
                  />

                  {dictionary.livrable.hints.statusname ? (
                    <FormDescription>
                      {dictionary.livrable.hints.statusname}
                    </FormDescription>
                  ) : null}

                  <FormMessage data-testid="statusname-error" />
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
