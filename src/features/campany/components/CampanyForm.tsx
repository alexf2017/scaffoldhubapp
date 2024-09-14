import { zodResolver } from '@hookform/resolvers/zod';
import { Campany } from '@prisma/client';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { LuLoader2 } from 'react-icons/lu';
import * as React from 'react';
import { useForm } from 'react-hook-form';
import { CampanyWithRelationships } from 'src/features/campany/campanySchemas';
import {
  campanyCreateApiCall,
  campanyUpdateApiCall,
} from 'src/features/campany/campanyApiCalls';
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
import { campanyCreateInputSchema } from 'src/features/campany/campanySchemas';
import { Input } from 'src/shared/components/ui/input';
import { FilesInput } from 'src/features/file/components/FilesInput';
import { storage } from 'src/features/storage';

export function CampanyForm({
  campany,
  context,
  onSuccess,
  onCancel,
}: {
  onCancel: () => void;
  onSuccess: (campany: CampanyWithRelationships) => void;
  campany?: Partial<CampanyWithRelationships>;
  context: AppContext;
}) {
  const { locale, dictionary } = context;

  const queryClient = useQueryClient();

  z.setErrorMap(getZodErrorMap(locale));

  const isEditing = Boolean(campany?.id);

  const [initialValues] = React.useState({
    name: campany?.name || '',
    logo: campany?.logo || [],
    urlSiteOfficiel: campany?.urlSiteOfficiel || '',
    adresse: campany?.adresse || '',
    government: campany?.government || '',
  });

  const form = useForm({
    resolver: zodResolver(campanyCreateInputSchema),
    mode: 'onSubmit',
    defaultValues: initialValues,
  });

  const mutation = useMutation({
    mutationFn: (data: z.input<typeof campanyCreateInputSchema>) => {
      if (campany?.id) {
        return campanyUpdateApiCall(campany.id, data);
      } else {
        return campanyCreateApiCall(data);
      }
    },
    onSuccess: (campany: Campany) => {
      queryClient.invalidateQueries({
        queryKey: ['campany'],
      });

      onSuccess(campany);

      toast({
        description: isEditing
          ? dictionary.campany.edit.success
          : dictionary.campany.new.success,
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
                  <FormLabel>
                    {dictionary.campany.fields.name}
                  </FormLabel>

                  <Input
                    disabled={mutation.isPending || mutation.isSuccess}
                    autoFocus
          {...field}
                  />

                  {dictionary.campany.hints.name ? (
                    <FormDescription>
                      {dictionary.campany.hints.name}
                    </FormDescription>
                  ) : null}

                  <FormMessage data-testid="name-error" />
                </FormItem>
              )}
            />
          </div>
          <div className="grid max-w-lg gap-1">
            <FormField
              control={form.control}
              name="logo"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    {dictionary.campany.fields.logo}
                  </FormLabel>

                  <div>
                    <FilesInput
                      onChange={field.onChange}
                      value={field.value}
                      dictionary={dictionary}
                      storage={storage.campanyLogo}
                      disabled={mutation.isPending || mutation.isSuccess}
                    />
                  </div>

                  {dictionary.campany.hints.logo ? (
                    <FormDescription>
                      {dictionary.campany.hints.logo}
                    </FormDescription>
                  ) : null}

                  <FormMessage data-testid="logo-error" />
                </FormItem>
              )}
            />
          </div>
          <div className="grid max-w-lg gap-1">
            <FormField
              control={form.control}
              name="urlSiteOfficiel"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    {dictionary.campany.fields.urlSiteOfficiel}
                  </FormLabel>

                  <Input
                    disabled={mutation.isPending || mutation.isSuccess}
                    {...field}
                  />

                  {dictionary.campany.hints.urlSiteOfficiel ? (
                    <FormDescription>
                      {dictionary.campany.hints.urlSiteOfficiel}
                    </FormDescription>
                  ) : null}

                  <FormMessage data-testid="urlSiteOfficiel-error" />
                </FormItem>
              )}
            />
          </div>
          <div className="grid max-w-lg gap-1">
            <FormField
              control={form.control}
              name="adresse"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    {dictionary.campany.fields.adresse}
                  </FormLabel>

                  <Input
                    disabled={mutation.isPending || mutation.isSuccess}
                    {...field}
                  />

                  {dictionary.campany.hints.adresse ? (
                    <FormDescription>
                      {dictionary.campany.hints.adresse}
                    </FormDescription>
                  ) : null}

                  <FormMessage data-testid="adresse-error" />
                </FormItem>
              )}
            />
          </div>
          <div className="grid max-w-lg gap-1">
            <FormField
              control={form.control}
              name="government"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    {dictionary.campany.fields.government}
                  </FormLabel>

                  <Input
                    disabled={mutation.isPending || mutation.isSuccess}
                    {...field}
                  />

                  {dictionary.campany.hints.government ? (
                    <FormDescription>
                      {dictionary.campany.hints.government}
                    </FormDescription>
                  ) : null}

                  <FormMessage data-testid="government-error" />
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
