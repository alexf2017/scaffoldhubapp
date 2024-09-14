'use client';

import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { CommentWithRelationships } from 'src/features/comment/commentSchemas';
import { commentFindApiCall } from 'src/features/comment/commentApiCalls';
import { CommentActions } from 'src/features/comment/components/CommentActions';
import { commentPermissions } from 'src/features/comment/commentPermissions';
import Breadcrumb from 'src/shared/components/Breadcrumb';
import { CopyToClipboardButton } from 'src/shared/components/CopyToClipboardButton';
import { toast } from 'src/shared/components/ui/use-toast';
import { AppContext } from 'src/shared/controller/appContext';
import { formatDatetime } from 'src/shared/lib/formatDateTime';
import { workflowStepLabel } from 'src/features/workflowStep/workflowStepLabel';
import { WorkflowStepLink } from 'src/features/workflowStep/components/WorkflowStepLink';
import { commentLabel } from 'src/features/comment/commentLabel';
import { MembershipLink } from 'src/features/membership/components/MembershipLink';
import { membershipLabel } from 'src/features/membership/membershipLabel';

export function CommentView({
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
    queryKey: ['comment', id],
    queryFn: async ({ signal }) => {
      return await commentFindApiCall(id, signal);
    },
    initialData: () =>
      (
        queryClient.getQueryData([
          'comment',
        ]) as Array<CommentWithRelationships>
      )?.find((d) => d.id === id),
  });

  const comment = query.data;

  if (query.isSuccess && !comment) {
    router.push('/comment');
    return null;
  }

  if (query.isError) {
    toast({
      description:
        (query.error as any).message || dictionary.shared.errors.unknown,
      variant: 'destructive',
    });
    router.push('/comment');
    return null;
  }

  if (!comment) {
    return null;
  }

  return (
    <div className="flex flex-1 flex-col">
      <div className="flex items-center justify-between">
        <Breadcrumb
          items={[
            [dictionary.comment.list.menu, '/comment'],
            [commentLabel(comment, dictionary)],
          ]}
        />
        <div className="flex gap-2">
          <CommentActions mode="view" comment={comment} context={context} />
        </div>
      </div>

      <div className="my-6 divide-y border-t">
        {Boolean(comment.context) && (
          <div className="grid grid-cols-3 gap-4 py-4 text-sm lg:grid-cols-4">
            <div className="font-semibold">
              {dictionary.comment.fields.context}
            </div>
            <div className="col-span-2 flex items-baseline gap-4 lg:col-span-3">
              <span>{comment.context}</span>
              <CopyToClipboardButton
                text={comment.context}
                dictionary={context.dictionary}
              />
            </div>
          </div>
        )}
        {comment.workflowstepid != null && (
          <div className="grid grid-cols-3 gap-4 py-4 text-sm lg:grid-cols-4">
            <div className="font-semibold">
              {dictionary.comment.fields.workflowstepid}
            </div>
            <div className="col-span-2 flex items-baseline gap-4 lg:col-span-3">
              <WorkflowStepLink workflowStep={comment.workflowstepid} context={context} />
              <CopyToClipboardButton
                text={workflowStepLabel(comment.workflowstepid, context.dictionary)}
                dictionary={context.dictionary}
              />
            </div>
          </div>
        )}

        {comment.createdByMembership != null && (
          <div className="grid grid-cols-3 gap-4 py-4 text-sm lg:grid-cols-4">
            <div className="font-semibold">
              {dictionary.comment.fields.createdByMembership}
            </div>
            <div className="col-span-2 flex items-baseline gap-4 lg:col-span-3">
              <MembershipLink
                membership={comment.createdByMembership}
                context={context}
              />
              <CopyToClipboardButton
                text={membershipLabel(
                  comment.createdByMembership,
                  context.dictionary,
                )}
                dictionary={context.dictionary}
              />
            </div>
          </div>
        )}

        {comment.createdAt != null && (
          <div className="grid grid-cols-3 gap-4 py-4 text-sm lg:grid-cols-4">
            <div className="font-semibold">
              {dictionary.comment.fields.createdAt}
            </div>
            <div className="col-span-2 flex items-baseline gap-4 lg:col-span-3">
              <span>{formatDatetime(comment.createdAt, dictionary)}</span>
              <CopyToClipboardButton
                text={formatDatetime(comment.createdAt, dictionary)}
                dictionary={context.dictionary}
              />
            </div>
          </div>
        )}

        {comment.updatedByMembership != null && (
          <div className="grid grid-cols-3 gap-4 py-4 text-sm lg:grid-cols-4">
            <div className="font-semibold">
              {dictionary.comment.fields.updatedByMembership}
            </div>
            <div className="col-span-2 flex items-baseline gap-4 lg:col-span-3">
              <MembershipLink
                membership={comment.updatedByMembership}
                context={context}
              />
              <CopyToClipboardButton
                text={membershipLabel(
                  comment.updatedByMembership,
                  context.dictionary,
                )}
                dictionary={context.dictionary}
              />
            </div>
          </div>
        )}

        {comment.updatedAt != null && (
          <div className="grid grid-cols-3 gap-4 py-4 text-sm lg:grid-cols-4">
            <div className="font-semibold">
              {dictionary.comment.fields.updatedAt}
            </div>
            <div className="col-span-2 flex items-baseline gap-4 lg:col-span-3">
              <span>{formatDatetime(comment.updatedAt, dictionary)}</span>
              <CopyToClipboardButton
                text={formatDatetime(comment.updatedAt, dictionary)}
                dictionary={context.dictionary}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
