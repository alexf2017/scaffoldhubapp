import { zodResolver } from '@hookform/resolvers/zod';
import { Projet } from '@prisma/client';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { LuLoader2 } from 'react-icons/lu';
import * as React from 'react';
import { useForm } from 'react-hook-form';
import { ProjetWithRelationships } from 'src/features/projet/projetSchemas';
import {
  projetCreateApiCall,
  projetUpdateApiCall,
} from 'src/features/projet/projetApiCalls';
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
import { projetCreateInputSchema } from 'src/features/projet/projetSchemas';
import { Input } from 'src/shared/components/ui/input';
import { Switch } from 'src/shared/components/ui/switch';

export function ProjetForm({
  projet,
  context,
  onSuccess,
  onCancel,
}: {
  onCancel: () => void;
  onSuccess: (projet: ProjetWithRelationships) => void;
  projet?: Partial<ProjetWithRelationships>;
  context: AppContext;
}) {
  const { locale, dictionary } = context;

  const queryClient = useQueryClient();

  z.setErrorMap(getZodErrorMap(locale));

  const isEditing = Boolean(projet?.id);

  const [initialValues] = React.useState({
    title: projet?.title || '',
    isDone: projet?.isDone || false,
  });

  const form = useForm({
    resolver: zodResolver(projetCreateInputSchema),
    mode: 'onSubmit',
    defaultValues: initialValues,
  });

  const mutation = useMutation({
    mutationFn: (data: z.input<typeof projetCreateInputSchema>) => {
      if (projet?.id) {
        return projetUpdateApiCall(projet.id, data);
      } else {
        return projetCreateApiCall(data);
      }
    },
    onSuccess: (projet: Projet) => {
      queryClient.invalidateQueries({
        queryKey: ['projet'],
      });

      onSuccess(projet);

      toast({
        description: isEditing
          ? dictionary.projet.edit.success
          : dictionary.projet.new.success,
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
                    {dictionary.projet.fields.title}
                  </FormLabel>

                  <Input
                    disabled={mutation.isPending || mutation.isSuccess}
                    autoFocus
          {...field}
                  />

                  {dictionary.projet.hints.title ? (
                    <FormDescription>
                      {dictionary.projet.hints.title}
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
                      {dictionary.projet.fields.isDone}
                    </FormLabel>
                  </div>

                  {dictionary.projet.hints.isDone ? (
                    <FormDescription>
                      {dictionary.projet.hints.isDone}
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
