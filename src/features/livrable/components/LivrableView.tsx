'use client';

import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { LivrableWithRelationships } from 'src/features/livrable/livrableSchemas';
import { livrableFindApiCall } from 'src/features/livrable/livrableApiCalls';
import { LivrableActions } from 'src/features/livrable/components/LivrableActions';
import { livrablePermissions } from 'src/features/livrable/livrablePermissions';
import Breadcrumb from 'src/shared/components/Breadcrumb';
import { CopyToClipboardButton } from 'src/shared/components/CopyToClipboardButton';
import { toast } from 'src/shared/components/ui/use-toast';
import { AppContext } from 'src/shared/controller/appContext';
import { formatDatetime } from 'src/shared/lib/formatDateTime';
import FileListItem from 'src/features/file/components/FileListItem';
import { projetLabel } from 'src/features/projet/projetLabel';
import { ProjetLink } from 'src/features/projet/components/ProjetLink';
import { statusLabel } from 'src/features/status/statusLabel';
import { StatusLink } from 'src/features/status/components/StatusLink';
import { workflowStepLabel } from 'src/features/workflowStep/workflowStepLabel';
import { WorkflowStepLink } from 'src/features/workflowStep/components/WorkflowStepLink';
import { livrableLabel } from 'src/features/livrable/livrableLabel';
import { MembershipLink } from 'src/features/membership/components/MembershipLink';
import { membershipLabel } from 'src/features/membership/membershipLabel';

export function LivrableView({
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
    queryKey: ['livrable', id],
    queryFn: async ({ signal }) => {
      return await livrableFindApiCall(id, signal);
    },
    initialData: () =>
      (
        queryClient.getQueryData([
          'livrable',
        ]) as Array<LivrableWithRelationships>
      )?.find((d) => d.id === id),
  });

  const livrable = query.data;

  if (query.isSuccess && !livrable) {
    router.push('/livrable');
    return null;
  }

  if (query.isError) {
    toast({
      description:
        (query.error as any).message || dictionary.shared.errors.unknown,
      variant: 'destructive',
    });
    router.push('/livrable');
    return null;
  }

  if (!livrable) {
    return null;
  }

  return (
    <div className="flex flex-1 flex-col">
      <div className="flex items-center justify-between">
        <Breadcrumb
          items={[
            [dictionary.livrable.list.menu, '/livrable'],
            [livrableLabel(livrable, dictionary)],
          ]}
        />
        <div className="flex gap-2">
          <LivrableActions mode="view" livrable={livrable} context={context} />
        </div>
      </div>

      <div className="my-6 divide-y border-t">
        {Boolean(livrable.title) && (
          <div className="grid grid-cols-3 gap-4 py-4 text-sm lg:grid-cols-4">
            <div className="font-semibold">
              {dictionary.livrable.fields.title}
            </div>
            <div className="col-span-2 flex items-baseline gap-4 lg:col-span-3">
              <span>{livrable.title}</span>
              <CopyToClipboardButton
                text={livrable.title}
                dictionary={context.dictionary}
              />
            </div>
          </div>
        )}
        {Boolean((livrable.document as Array<any>)?.length) && (
          <div className="grid grid-cols-3 gap-4 py-4 text-sm lg:grid-cols-4">
            <div className="font-semibold">
              {dictionary.livrable.fields.document}
            </div>
            <div className="col-span-2">
              <FileListItem files={livrable.document as Array<any>} />
            </div>
          </div>
        )}
        {livrable.projet != null && (
          <div className="grid grid-cols-3 gap-4 py-4 text-sm lg:grid-cols-4">
            <div className="font-semibold">
              {dictionary.livrable.fields.projet}
            </div>
            <div className="col-span-2 flex items-baseline gap-4 lg:col-span-3">
              <ProjetLink projet={livrable.projet} context={context} />
              <CopyToClipboardButton
                text={projetLabel(livrable.projet, context.dictionary)}
                dictionary={context.dictionary}
              />
            </div>
          </div>
        )}
        {livrable.statusname != null && (
          <div className="grid grid-cols-3 gap-4 py-4 text-sm lg:grid-cols-4">
            <div className="font-semibold">
              {dictionary.livrable.fields.statusname}
            </div>
            <div className="col-span-2 flex items-baseline gap-4 lg:col-span-3">
              <StatusLink status={livrable.statusname} context={context} />
              <CopyToClipboardButton
                text={statusLabel(livrable.statusname, context.dictionary)}
                dictionary={context.dictionary}
              />
            </div>
          </div>
        )}
        {livrable.wfs?.length ? (<div className="grid grid-cols-3 gap-4 py-4 text-sm lg:grid-cols-4">
          <div className="font-semibold">
            {dictionary.livrable.fields.wfs}
          </div>
          <div className="col-span-2 flex flex-col gap-1">
            {livrable.wfs?.map((item) => {
              return (
                <div key={item?.id} className="flex items-center gap-4">
                  <WorkflowStepLink
                    workflowStep={item}
                    context={context}
                    className="whitespace-nowrap"
                  />
                  <CopyToClipboardButton
                    text={workflowStepLabel(item, context.dictionary)}
                    dictionary={context.dictionary}
                  />
                </div>
              );
            })}
          </div>
        </div>): null}

        {livrable.createdByMembership != null && (
          <div className="grid grid-cols-3 gap-4 py-4 text-sm lg:grid-cols-4">
            <div className="font-semibold">
              {dictionary.livrable.fields.createdByMembership}
            </div>
            <div className="col-span-2 flex items-baseline gap-4 lg:col-span-3">
              <MembershipLink
                membership={livrable.createdByMembership}
                context={context}
              />
              <CopyToClipboardButton
                text={membershipLabel(
                  livrable.createdByMembership,
                  context.dictionary,
                )}
                dictionary={context.dictionary}
              />
            </div>
          </div>
        )}

        {livrable.createdAt != null && (
          <div className="grid grid-cols-3 gap-4 py-4 text-sm lg:grid-cols-4">
            <div className="font-semibold">
              {dictionary.livrable.fields.createdAt}
            </div>
            <div className="col-span-2 flex items-baseline gap-4 lg:col-span-3">
              <span>{formatDatetime(livrable.createdAt, dictionary)}</span>
              <CopyToClipboardButton
                text={formatDatetime(livrable.createdAt, dictionary)}
                dictionary={context.dictionary}
              />
            </div>
          </div>
        )}

        {livrable.updatedByMembership != null && (
          <div className="grid grid-cols-3 gap-4 py-4 text-sm lg:grid-cols-4">
            <div className="font-semibold">
              {dictionary.livrable.fields.updatedByMembership}
            </div>
            <div className="col-span-2 flex items-baseline gap-4 lg:col-span-3">
              <MembershipLink
                membership={livrable.updatedByMembership}
                context={context}
              />
              <CopyToClipboardButton
                text={membershipLabel(
                  livrable.updatedByMembership,
                  context.dictionary,
                )}
                dictionary={context.dictionary}
              />
            </div>
          </div>
        )}

        {livrable.updatedAt != null && (
          <div className="grid grid-cols-3 gap-4 py-4 text-sm lg:grid-cols-4">
            <div className="font-semibold">
              {dictionary.livrable.fields.updatedAt}
            </div>
            <div className="col-span-2 flex items-baseline gap-4 lg:col-span-3">
              <span>{formatDatetime(livrable.updatedAt, dictionary)}</span>
              <CopyToClipboardButton
                text={formatDatetime(livrable.updatedAt, dictionary)}
                dictionary={context.dictionary}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
