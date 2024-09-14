'use client';

import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { StatusWithRelationships } from 'src/features/status/statusSchemas';
import { statusFindApiCall } from 'src/features/status/statusApiCalls';
import { StatusActions } from 'src/features/status/components/StatusActions';
import { statusPermissions } from 'src/features/status/statusPermissions';
import Breadcrumb from 'src/shared/components/Breadcrumb';
import { CopyToClipboardButton } from 'src/shared/components/CopyToClipboardButton';
import { toast } from 'src/shared/components/ui/use-toast';
import { AppContext } from 'src/shared/controller/appContext';
import { formatDatetime } from 'src/shared/lib/formatDateTime';
import { livrableLabel } from 'src/features/livrable/livrableLabel';
import { LivrableLink } from 'src/features/livrable/components/LivrableLink';
import { statusLabel } from 'src/features/status/statusLabel';
import { MembershipLink } from 'src/features/membership/components/MembershipLink';
import { membershipLabel } from 'src/features/membership/membershipLabel';

export function StatusView({
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
    queryKey: ['status', id],
    queryFn: async ({ signal }) => {
      return await statusFindApiCall(id, signal);
    },
    initialData: () =>
      (
        queryClient.getQueryData([
          'status',
        ]) as Array<StatusWithRelationships>
      )?.find((d) => d.id === id),
  });

  const status = query.data;

  if (query.isSuccess && !status) {
    router.push('/status');
    return null;
  }

  if (query.isError) {
    toast({
      description:
        (query.error as any).message || dictionary.shared.errors.unknown,
      variant: 'destructive',
    });
    router.push('/status');
    return null;
  }

  if (!status) {
    return null;
  }

  return (
    <div className="flex flex-1 flex-col">
      <div className="flex items-center justify-between">
        <Breadcrumb
          items={[
            [dictionary.status.list.menu, '/status'],
            [statusLabel(status, dictionary)],
          ]}
        />
        <div className="flex gap-2">
          <StatusActions mode="view" status={status} context={context} />
        </div>
      </div>

      <div className="my-6 divide-y border-t">
        {Boolean(status.name) && (
          <div className="grid grid-cols-3 gap-4 py-4 text-sm lg:grid-cols-4">
            <div className="font-semibold">
              {dictionary.status.fields.name}
            </div>
            <div className="col-span-2 flex items-baseline gap-4 lg:col-span-3">
              <span>{status.name}</span>
              <CopyToClipboardButton
                text={status.name}
                dictionary={context.dictionary}
              />
            </div>
          </div>
        )}
        {status.livrble?.length ? (<div className="grid grid-cols-3 gap-4 py-4 text-sm lg:grid-cols-4">
          <div className="font-semibold">
            {dictionary.status.fields.livrble}
          </div>
          <div className="col-span-2 flex flex-col gap-1">
            {status.livrble?.map((item) => {
              return (
                <div key={item?.id} className="flex items-center gap-4">
                  <LivrableLink
                    livrable={item}
                    context={context}
                    className="whitespace-nowrap"
                  />
                  <CopyToClipboardButton
                    text={livrableLabel(item, context.dictionary)}
                    dictionary={context.dictionary}
                  />
                </div>
              );
            })}
          </div>
        </div>): null}

        {status.createdByMembership != null && (
          <div className="grid grid-cols-3 gap-4 py-4 text-sm lg:grid-cols-4">
            <div className="font-semibold">
              {dictionary.status.fields.createdByMembership}
            </div>
            <div className="col-span-2 flex items-baseline gap-4 lg:col-span-3">
              <MembershipLink
                membership={status.createdByMembership}
                context={context}
              />
              <CopyToClipboardButton
                text={membershipLabel(
                  status.createdByMembership,
                  context.dictionary,
                )}
                dictionary={context.dictionary}
              />
            </div>
          </div>
        )}

        {status.createdAt != null && (
          <div className="grid grid-cols-3 gap-4 py-4 text-sm lg:grid-cols-4">
            <div className="font-semibold">
              {dictionary.status.fields.createdAt}
            </div>
            <div className="col-span-2 flex items-baseline gap-4 lg:col-span-3">
              <span>{formatDatetime(status.createdAt, dictionary)}</span>
              <CopyToClipboardButton
                text={formatDatetime(status.createdAt, dictionary)}
                dictionary={context.dictionary}
              />
            </div>
          </div>
        )}

        {status.updatedByMembership != null && (
          <div className="grid grid-cols-3 gap-4 py-4 text-sm lg:grid-cols-4">
            <div className="font-semibold">
              {dictionary.status.fields.updatedByMembership}
            </div>
            <div className="col-span-2 flex items-baseline gap-4 lg:col-span-3">
              <MembershipLink
                membership={status.updatedByMembership}
                context={context}
              />
              <CopyToClipboardButton
                text={membershipLabel(
                  status.updatedByMembership,
                  context.dictionary,
                )}
                dictionary={context.dictionary}
              />
            </div>
          </div>
        )}

        {status.updatedAt != null && (
          <div className="grid grid-cols-3 gap-4 py-4 text-sm lg:grid-cols-4">
            <div className="font-semibold">
              {dictionary.status.fields.updatedAt}
            </div>
            <div className="col-span-2 flex items-baseline gap-4 lg:col-span-3">
              <span>{formatDatetime(status.updatedAt, dictionary)}</span>
              <CopyToClipboardButton
                text={formatDatetime(status.updatedAt, dictionary)}
                dictionary={context.dictionary}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
