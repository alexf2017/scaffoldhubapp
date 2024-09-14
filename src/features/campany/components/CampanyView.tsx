'use client';

import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { CampanyWithRelationships } from 'src/features/campany/campanySchemas';
import { campanyFindApiCall } from 'src/features/campany/campanyApiCalls';
import { CampanyActions } from 'src/features/campany/components/CampanyActions';
import { campanyPermissions } from 'src/features/campany/campanyPermissions';
import Breadcrumb from 'src/shared/components/Breadcrumb';
import { CopyToClipboardButton } from 'src/shared/components/CopyToClipboardButton';
import { toast } from 'src/shared/components/ui/use-toast';
import { AppContext } from 'src/shared/controller/appContext';
import { formatDatetime } from 'src/shared/lib/formatDateTime';
import FileListItem from 'src/features/file/components/FileListItem';
import { campanyLabel } from 'src/features/campany/campanyLabel';
import { MembershipLink } from 'src/features/membership/components/MembershipLink';
import { membershipLabel } from 'src/features/membership/membershipLabel';

export function CampanyView({
  id,
  context,
}: {
  id: string;
  context: AppContext;
}) {
  const { dictionary } = context;
  const queryClient = useQueryClient();
  const router = useRouter();

  const query = useQuery({
    queryKey: ['campany', id],
    queryFn: async ({ signal }) => {
      return await campanyFindApiCall(id, signal);
    },
    initialData: () =>
      (
        queryClient.getQueryData([
          'campany',
        ]) as Array<CampanyWithRelationships>
      )?.find((d) => d.id === id),
  });

  const campany = query.data;

  if (query.isSuccess && !campany) {
    router.push('/campany');
    return null;
  }

  if (query.isError) {
    toast({
      description:
        (query.error as any).message || dictionary.shared.errors.unknown,
      variant: 'destructive',
    });
    router.push('/campany');
    return null;
  }

  if (!campany) {
    return null;
  }

  return (
    <div className="flex flex-1 flex-col">
      <div className="flex items-center justify-between">
        <Breadcrumb
          items={[
            [dictionary.campany.list.menu, '/campany'],
            [campanyLabel(campany, dictionary)],
          ]}
        />
        <div className="flex gap-2">
          <CampanyActions mode="view" campany={campany} context={context} />
        </div>
      </div>

      <div className="my-6 divide-y border-t">
        {Boolean(campany.name) && (
          <div className="grid grid-cols-3 gap-4 py-4 text-sm lg:grid-cols-4">
            <div className="font-semibold">
              {dictionary.campany.fields.name}
            </div>
            <div className="col-span-2 flex items-baseline gap-4 lg:col-span-3">
              <span>{campany.name}</span>
              <CopyToClipboardButton
                text={campany.name}
                dictionary={context.dictionary}
              />
            </div>
          </div>
        )}
        {Boolean((campany.logo as Array<any>)?.length) && (
          <div className="grid grid-cols-3 gap-4 py-4 text-sm lg:grid-cols-4">
            <div className="font-semibold">
              {dictionary.campany.fields.logo}
            </div>
            <div className="col-span-2">
              <FileListItem files={campany.logo as Array<any>} />
            </div>
          </div>
        )}
        {Boolean(campany.urlSiteOfficiel) && (
          <div className="grid grid-cols-3 gap-4 py-4 text-sm lg:grid-cols-4">
            <div className="font-semibold">
              {dictionary.campany.fields.urlSiteOfficiel}
            </div>
            <div className="col-span-2 flex items-baseline gap-4 lg:col-span-3">
              <span>{campany.urlSiteOfficiel}</span>
              <CopyToClipboardButton
                text={campany.urlSiteOfficiel}
                dictionary={context.dictionary}
              />
            </div>
          </div>
        )}
        {Boolean(campany.adresse) && (
          <div className="grid grid-cols-3 gap-4 py-4 text-sm lg:grid-cols-4">
            <div className="font-semibold">
              {dictionary.campany.fields.adresse}
            </div>
            <div className="col-span-2 flex items-baseline gap-4 lg:col-span-3">
              <span>{campany.adresse}</span>
              <CopyToClipboardButton
                text={campany.adresse}
                dictionary={context.dictionary}
              />
            </div>
          </div>
        )}
        {Boolean(campany.government) && (
          <div className="grid grid-cols-3 gap-4 py-4 text-sm lg:grid-cols-4">
            <div className="font-semibold">
              {dictionary.campany.fields.government}
            </div>
            <div className="col-span-2 flex items-baseline gap-4 lg:col-span-3">
              <span>{campany.government}</span>
              <CopyToClipboardButton
                text={campany.government}
                dictionary={context.dictionary}
              />
            </div>
          </div>
        )}

        {campany.createdByMembership != null && (
          <div className="grid grid-cols-3 gap-4 py-4 text-sm lg:grid-cols-4">
            <div className="font-semibold">
              {dictionary.campany.fields.createdByMembership}
            </div>
            <div className="col-span-2 flex items-baseline gap-4 lg:col-span-3">
              <MembershipLink
                membership={campany.createdByMembership}
                context={context}
              />
              <CopyToClipboardButton
                text={membershipLabel(
                  campany.createdByMembership,
                  context.dictionary,
                )}
                dictionary={context.dictionary}
              />
            </div>
          </div>
        )}

        {campany.createdAt != null && (
          <div className="grid grid-cols-3 gap-4 py-4 text-sm lg:grid-cols-4">
            <div className="font-semibold">
              {dictionary.campany.fields.createdAt}
            </div>
            <div className="col-span-2 flex items-baseline gap-4 lg:col-span-3">
              <span>{formatDatetime(campany.createdAt, dictionary)}</span>
              <CopyToClipboardButton
                text={formatDatetime(campany.createdAt, dictionary)}
                dictionary={context.dictionary}
              />
            </div>
          </div>
        )}

        {campany.updatedByMembership != null && (
          <div className="grid grid-cols-3 gap-4 py-4 text-sm lg:grid-cols-4">
            <div className="font-semibold">
              {dictionary.campany.fields.updatedByMembership}
            </div>
            <div className="col-span-2 flex items-baseline gap-4 lg:col-span-3">
              <MembershipLink
                membership={campany.updatedByMembership}
                context={context}
              />
              <CopyToClipboardButton
                text={membershipLabel(
                  campany.updatedByMembership,
                  context.dictionary,
                )}
                dictionary={context.dictionary}
              />
            </div>
          </div>
        )}

        {campany.updatedAt != null && (
          <div className="grid grid-cols-3 gap-4 py-4 text-sm lg:grid-cols-4">
            <div className="font-semibold">
              {dictionary.campany.fields.updatedAt}
            </div>
            <div className="col-span-2 flex items-baseline gap-4 lg:col-span-3">
              <span>{formatDatetime(campany.updatedAt, dictionary)}</span>
              <CopyToClipboardButton
                text={formatDatetime(campany.updatedAt, dictionary)}
                dictionary={context.dictionary}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
