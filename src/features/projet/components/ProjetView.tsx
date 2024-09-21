'use client';

import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { ProjetWithRelationships } from 'src/features/projet/projetSchemas';
import { projetFindApiCall } from 'src/features/projet/projetApiCalls';
import { ProjetActions } from 'src/features/projet/components/ProjetActions';
import { projetPermissions } from 'src/features/projet/projetPermissions';
import Breadcrumb from 'src/shared/components/Breadcrumb';
import { CopyToClipboardButton } from 'src/shared/components/CopyToClipboardButton';
import { toast } from 'src/shared/components/ui/use-toast';
import { AppContext } from 'src/shared/controller/appContext';
import { formatDatetime } from 'src/shared/lib/formatDateTime';
import { livrableLabel } from 'src/features/livrable/livrableLabel';
import { LivrableLink } from 'src/features/livrable/components/LivrableLink';
import { projetLabel } from 'src/features/projet/projetLabel';
import { MembershipLink } from 'src/features/membership/components/MembershipLink';
import { membershipLabel } from 'src/features/membership/membershipLabel';
import { LuBan, LuCheckCircle } from 'react-icons/lu';

export function ProjetView({
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
    queryKey: ['projet', id],
    queryFn: async ({ signal }) => {
      return await projetFindApiCall(id, signal);
    },
    initialData: () =>
      (
        queryClient.getQueryData([
          'projet',
        ]) as Array<ProjetWithRelationships>
      )?.find((d) => d.id === id),
  });

  const projet = query.data;

  if (query.isSuccess && !projet) {
    router.push('/projet');
    return null;
  }

  if (query.isError) {
    toast({
      description:
        (query.error as any).message || dictionary.shared.errors.unknown,
      variant: 'destructive',
    });
    router.push('/projet');
    return null;
  }

  if (!projet) {
    return null;
  }

  return (
    <div className="flex flex-1 flex-col">
      <div className="flex items-center justify-between">
        <Breadcrumb
          items={[
            [dictionary.projet.list.menu, '/projet'],
            [projetLabel(projet, dictionary)],
          ]}
        />
        <div className="flex gap-2">
          <ProjetActions mode="view" projet={projet} context={context} />
        </div>
      </div>

      <div className="my-6 divide-y border-t">
        {Boolean(projet.title) && (
          <div className="grid grid-cols-3 gap-4 py-4 text-sm lg:grid-cols-4">
            <div className="font-semibold">
              {dictionary.projet.fields.title}
            </div>
            <div className="col-span-2 flex items-baseline gap-4 lg:col-span-3">
              <span>{projet.title}</span>
              <CopyToClipboardButton
                text={projet.title}
                dictionary={context.dictionary}
              />
            </div>
          </div>
        )}
        {projet.isDone != null && (
          <div className="grid grid-cols-3 gap-4 py-4 text-sm lg:grid-cols-4">
            <div className="font-semibold">
              {dictionary.projet.fields.isDone}
            </div>
            <div className="col-span-2 flex items-baseline gap-4 lg:col-span-3">
              <span>
                {projet.isDone
                  ? <LuCheckCircle />
                  : <LuBan />
                }
              </span>
              <CopyToClipboardButton
                text={
                  projet.isDone
                    ? dictionary.shared.yes
                    : dictionary.shared.no
                }
                dictionary={context.dictionary}
              />
            </div>
          </div>
        )}
        {projet.livrable?.length ? (<div className="grid grid-cols-3 gap-4 py-4 text-sm lg:grid-cols-4">
          <div className="font-semibold">
            {dictionary.projet.fields.livrable}
          </div>
          <div className="col-span-2 flex flex-col gap-1">
            {projet.livrable?.map((item) => {
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
        </div>) : null}

        {projet.createdByMembership != null && (
          <div className="grid grid-cols-3 gap-4 py-4 text-sm lg:grid-cols-4">
            <div className="font-semibold">
              {dictionary.projet.fields.createdByMembership}
            </div>
            <div className="col-span-2 flex items-baseline gap-4 lg:col-span-3">
              <MembershipLink
                membership={projet.createdByMembership}
                context={context}
              />
              <CopyToClipboardButton
                text={membershipLabel(
                  projet.createdByMembership,
                  context.dictionary,
                )}
                dictionary={context.dictionary}
              />
            </div>
          </div>
        )}

        {projet.createdAt != null && (
          <div className="grid grid-cols-3 gap-4 py-4 text-sm lg:grid-cols-4">
            <div className="font-semibold">
              {dictionary.projet.fields.createdAt}
            </div>
            <div className="col-span-2 flex items-baseline gap-4 lg:col-span-3">
              <span>{formatDatetime(projet.createdAt, dictionary)}</span>
              <CopyToClipboardButton
                text={formatDatetime(projet.createdAt, dictionary)}
                dictionary={context.dictionary}
              />
            </div>
          </div>
        )}

        {projet.updatedByMembership != null && (
          <div className="grid grid-cols-3 gap-4 py-4 text-sm lg:grid-cols-4">
            <div className="font-semibold">
              {dictionary.projet.fields.updatedByMembership}
            </div>
            <div className="col-span-2 flex items-baseline gap-4 lg:col-span-3">
              <MembershipLink
                membership={projet.updatedByMembership}
                context={context}
              />
              <CopyToClipboardButton
                text={membershipLabel(
                  projet.updatedByMembership,
                  context.dictionary,
                )}
                dictionary={context.dictionary}
              />
            </div>
          </div>
        )}

        {projet.updatedAt != null && (
          <div className="grid grid-cols-3 gap-4 py-4 text-sm lg:grid-cols-4">
            <div className="font-semibold">
              {dictionary.projet.fields.updatedAt}
            </div>
            <div className="col-span-2 flex items-baseline gap-4 lg:col-span-3">
              <span>{formatDatetime(projet.updatedAt, dictionary)}</span>
              <CopyToClipboardButton
                text={formatDatetime(projet.updatedAt, dictionary)}
                dictionary={context.dictionary}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
