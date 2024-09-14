'use client';

import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { WorkflowStepWithRelationships } from 'src/features/workflowStep/workflowStepSchemas';
import { workflowStepFindApiCall } from 'src/features/workflowStep/workflowStepApiCalls';
import { WorkflowStepActions } from 'src/features/workflowStep/components/WorkflowStepActions';
import { workflowStepPermissions } from 'src/features/workflowStep/workflowStepPermissions';
import Breadcrumb from 'src/shared/components/Breadcrumb';
import { CopyToClipboardButton } from 'src/shared/components/CopyToClipboardButton';
import { toast } from 'src/shared/components/ui/use-toast';
import { AppContext } from 'src/shared/controller/appContext';
import { formatDatetime } from 'src/shared/lib/formatDateTime';
import { stepsLabel } from 'src/features/steps/stepsLabel';
import { StepsLink } from 'src/features/steps/components/StepsLink';
import { workflowLabel } from 'src/features/workflow/workflowLabel';
import { WorkflowLink } from 'src/features/workflow/components/WorkflowLink';
import { membershipLabel } from 'src/features/membership/membershipLabel';
import { MembershipLink } from 'src/features/membership/components/MembershipLink';
import { livrableLabel } from 'src/features/livrable/livrableLabel';
import { LivrableLink } from 'src/features/livrable/components/LivrableLink';
import { commentLabel } from 'src/features/comment/commentLabel';
import { CommentLink } from 'src/features/comment/components/CommentLink';
import { workflowStepLabel } from 'src/features/workflowStep/workflowStepLabel';

export function WorkflowStepView({
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
    queryKey: ['workflowStep', id],
    queryFn: async ({ signal }) => {
      return await workflowStepFindApiCall(id, signal);
    },
    initialData: () =>
      (
        queryClient.getQueryData([
          'workflowStep',
        ]) as Array<WorkflowStepWithRelationships>
      )?.find((d) => d.id === id),
  });

  const workflowStep = query.data;

  if (query.isSuccess && !workflowStep) {
    router.push('/workflow-step');
    return null;
  }

  if (query.isError) {
    toast({
      description:
        (query.error as any).message || dictionary.shared.errors.unknown,
      variant: 'destructive',
    });
    router.push('/workflow-step');
    return null;
  }

  if (!workflowStep) {
    return null;
  }

  return (
    <div className="flex flex-1 flex-col">
      <div className="flex items-center justify-between">
        <Breadcrumb
          items={[
            [dictionary.workflowStep.list.menu, '/workflow-step'],
            [workflowStepLabel(workflowStep, dictionary)],
          ]}
        />
        <div className="flex gap-2">
          <WorkflowStepActions mode="view" workflowStep={workflowStep} context={context} />
        </div>
      </div>

      <div className="my-6 divide-y border-t">
        {workflowStep.order != null && (
          <div className="grid grid-cols-3 gap-4 py-4 text-sm lg:grid-cols-4">
            <div className="font-semibold">
              {dictionary.workflowStep.fields.order}
            </div>
            <div className="col-span-2 flex items-baseline gap-4 lg:col-span-3">
              <span>{workflowStep.order}</span>
              <CopyToClipboardButton
                text={workflowStep.order.toString()}
                dictionary={context.dictionary}
              />
            </div>
          </div>
        )}
        {workflowStep.responsible != null && (
          <div className="grid grid-cols-3 gap-4 py-4 text-sm lg:grid-cols-4">
            <div className="font-semibold">
              {dictionary.workflowStep.fields.responsible}
            </div>
            <div className="col-span-2 flex items-baseline gap-4 lg:col-span-3">
              <MembershipLink membership={workflowStep.responsible} context={context} />
              <CopyToClipboardButton
                text={membershipLabel(workflowStep.responsible, context.dictionary)}
                dictionary={context.dictionary}
              />
            </div>
          </div>
        )}
        {workflowStep.observer != null && (
          <div className="grid grid-cols-3 gap-4 py-4 text-sm lg:grid-cols-4">
            <div className="font-semibold">
              {dictionary.workflowStep.fields.observer}
            </div>
            <div className="col-span-2 flex items-baseline gap-4 lg:col-span-3">
              <MembershipLink membership={workflowStep.observer} context={context} />
              <CopyToClipboardButton
                text={membershipLabel(workflowStep.observer, context.dictionary)}
                dictionary={context.dictionary}
              />
            </div>
          </div>
        )}
        {workflowStep.livrable != null && (
          <div className="grid grid-cols-3 gap-4 py-4 text-sm lg:grid-cols-4">
            <div className="font-semibold">
              {dictionary.workflowStep.fields.livrable}
            </div>
            <div className="col-span-2 flex items-baseline gap-4 lg:col-span-3">
              <LivrableLink livrable={workflowStep.livrable} context={context} />
              <CopyToClipboardButton
                text={livrableLabel(workflowStep.livrable, context.dictionary)}
                dictionary={context.dictionary}
              />
            </div>
          </div>
        )}
        {workflowStep.steptitle != null && (
          <div className="grid grid-cols-3 gap-4 py-4 text-sm lg:grid-cols-4">
            <div className="font-semibold">
              {dictionary.workflowStep.fields.steptitle}
            </div>
            <div className="col-span-2 flex items-baseline gap-4 lg:col-span-3">
              <StepsLink steps={workflowStep.steptitle} context={context} />
              <CopyToClipboardButton
                text={stepsLabel(workflowStep.steptitle, context.dictionary)}
                dictionary={context.dictionary}
              />
            </div>
          </div>
        )}
        {workflowStep.workFlow != null && (
          <div className="grid grid-cols-3 gap-4 py-4 text-sm lg:grid-cols-4">
            <div className="font-semibold">
              {dictionary.workflowStep.fields.workFlow}
            </div>
            <div className="col-span-2 flex items-baseline gap-4 lg:col-span-3">
              <WorkflowLink workflow={workflowStep.workFlow} context={context} />
              <CopyToClipboardButton
                text={workflowLabel(workflowStep.workFlow, context.dictionary)}
                dictionary={context.dictionary}
              />
            </div>
          </div>
        )}
        {workflowStep.isDone != null && (
          <div className="grid grid-cols-3 gap-4 py-4 text-sm lg:grid-cols-4">
            <div className="font-semibold">
              {dictionary.workflowStep.fields.isDone}
            </div>
            <div className="col-span-2 flex items-baseline gap-4 lg:col-span-3">
              <span>
                {workflowStep.isDone
                  ? dictionary.shared.yes
                  : dictionary.shared.no}
              </span>
              <CopyToClipboardButton
                text={
                  workflowStep.isDone
                    ? dictionary.shared.yes
                    : dictionary.shared.no
                }
                dictionary={context.dictionary}
              />
            </div>
          </div>
        )}
        {workflowStep.cmt?.length ? (<div className="grid grid-cols-3 gap-4 py-4 text-sm lg:grid-cols-4">
          <div className="font-semibold">
            {dictionary.workflowStep.fields.cmt}
          </div>
          <div className="col-span-2 flex flex-col gap-1">
            {workflowStep.cmt?.map((item) => {
              return (
                <div key={item?.id} className="flex items-center gap-4">
                  <CommentLink
                    comment={item}
                    context={context}
                    className="whitespace-nowrap"
                  />
                  <CopyToClipboardButton
                    text={commentLabel(item, context.dictionary)}
                    dictionary={context.dictionary}
                  />
                </div>
              );
            })}
          </div>
        </div>) : null}

        {workflowStep.createdByMembership != null && (
          <div className="grid grid-cols-3 gap-4 py-4 text-sm lg:grid-cols-4">
            <div className="font-semibold">
              {dictionary.workflowStep.fields.createdByMembership}
            </div>
            <div className="col-span-2 flex items-baseline gap-4 lg:col-span-3">
              <MembershipLink
                membership={workflowStep.createdByMembership}
                context={context}
              />
              <CopyToClipboardButton
                text={membershipLabel(
                  workflowStep.createdByMembership,
                  context.dictionary,
                )}
                dictionary={context.dictionary}
              />
            </div>
          </div>
        )}

        {workflowStep.createdAt != null && (
          <div className="grid grid-cols-3 gap-4 py-4 text-sm lg:grid-cols-4">
            <div className="font-semibold">
              {dictionary.workflowStep.fields.createdAt}
            </div>
            <div className="col-span-2 flex items-baseline gap-4 lg:col-span-3">
              <span>{formatDatetime(workflowStep.createdAt, dictionary)}</span>
              <CopyToClipboardButton
                text={formatDatetime(workflowStep.createdAt, dictionary)}
                dictionary={context.dictionary}
              />
            </div>
          </div>
        )}

        {workflowStep.updatedByMembership != null && (
          <div className="grid grid-cols-3 gap-4 py-4 text-sm lg:grid-cols-4">
            <div className="font-semibold">
              {dictionary.workflowStep.fields.updatedByMembership}
            </div>
            <div className="col-span-2 flex items-baseline gap-4 lg:col-span-3">
              <MembershipLink
                membership={workflowStep.updatedByMembership}
                context={context}
              />
              <CopyToClipboardButton
                text={membershipLabel(
                  workflowStep.updatedByMembership,
                  context.dictionary,
                )}
                dictionary={context.dictionary}
              />
            </div>
          </div>
        )}

        {workflowStep.updatedAt != null && (
          <div className="grid grid-cols-3 gap-4 py-4 text-sm lg:grid-cols-4">
            <div className="font-semibold">
              {dictionary.workflowStep.fields.updatedAt}
            </div>
            <div className="col-span-2 flex items-baseline gap-4 lg:col-span-3">
              <span>{formatDatetime(workflowStep.updatedAt, dictionary)}</span>
              <CopyToClipboardButton
                text={formatDatetime(workflowStep.updatedAt, dictionary)}
                dictionary={context.dictionary}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
