'use client';

import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { WorkflowWithRelationships } from 'src/features/workflow/workflowSchemas';
import { workflowFindApiCall } from 'src/features/workflow/workflowApiCalls';
import { WorkflowActions } from 'src/features/workflow/components/WorkflowActions';
import { workflowPermissions } from 'src/features/workflow/workflowPermissions';
import Breadcrumb from 'src/shared/components/Breadcrumb';
import { CopyToClipboardButton } from 'src/shared/components/CopyToClipboardButton';
import { toast } from 'src/shared/components/ui/use-toast';
import { AppContext } from 'src/shared/controller/appContext';
import { formatDatetime } from 'src/shared/lib/formatDateTime';
import { stepsLabel } from 'src/features/steps/stepsLabel';
import { StepsLink } from 'src/features/steps/components/StepsLink';
import { workflowStepLabel } from 'src/features/workflowStep/workflowStepLabel';
import { WorkflowStepLink } from 'src/features/workflowStep/components/WorkflowStepLink';
import { workflowLabel } from 'src/features/workflow/workflowLabel';
import { MembershipLink } from 'src/features/membership/components/MembershipLink';
import { membershipLabel } from 'src/features/membership/membershipLabel';

export function WorkflowView({
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
    queryKey: ['workflow', id],
    queryFn: async ({ signal }) => {
      return await workflowFindApiCall(id, signal);
    },
    initialData: () =>
      (
        queryClient.getQueryData([
          'workflow',
        ]) as Array<WorkflowWithRelationships>
      )?.find((d) => d.id === id),
  });

  const workflow = query.data;

  if (query.isSuccess && !workflow) {
    router.push('/workflow');
    return null;
  }

  if (query.isError) {
    toast({
      description:
        (query.error as any).message || dictionary.shared.errors.unknown,
      variant: 'destructive',
    });
    router.push('/workflow');
    return null;
  }

  if (!workflow) {
    return null;
  }

  return (
    <div className="flex flex-1 flex-col">
      <div className="flex items-center justify-between">
        <Breadcrumb
          items={[
            [dictionary.workflow.list.menu, '/workflow'],
            [workflowLabel(workflow, dictionary)],
          ]}
        />
        <div className="flex gap-2">
          <WorkflowActions mode="view" workflow={workflow} context={context} />
        </div>
      </div>

      <div className="my-6 divide-y border-t">
        {Boolean(workflow.title) && (
          <div className="grid grid-cols-3 gap-4 py-4 text-sm lg:grid-cols-4">
            <div className="font-semibold">
              {dictionary.workflow.fields.title}
            </div>
            <div className="col-span-2 flex items-baseline gap-4 lg:col-span-3">
              <span>{workflow.title}</span>
              <CopyToClipboardButton
                text={workflow.title}
                dictionary={context.dictionary}
              />
            </div>
          </div>
        )}
        {workflow.steps?.length ? (<div className="grid grid-cols-3 gap-4 py-4 text-sm lg:grid-cols-4">
          <div className="font-semibold">
            {dictionary.workflow.fields.steps}
          </div>
          <div className="col-span-2 flex flex-col gap-1">
            {workflow.steps?.map((item) => {
              return (
                <div key={item?.id} className="flex items-center gap-4">
                  <StepsLink
                    steps={item}
                    context={context}
                    className="whitespace-nowrap"
                  />
                  <CopyToClipboardButton
                    text={stepsLabel(item, context.dictionary)}
                    dictionary={context.dictionary}
                  />
                </div>
              );
            })}
          </div>
        </div>): null}
        {workflow.wf?.length ? (<div className="grid grid-cols-3 gap-4 py-4 text-sm lg:grid-cols-4">
          <div className="font-semibold">
            {dictionary.workflow.fields.wf}
          </div>
          <div className="col-span-2 flex flex-col gap-1">
            {workflow.wf?.map((item) => {
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

        {workflow.createdByMembership != null && (
          <div className="grid grid-cols-3 gap-4 py-4 text-sm lg:grid-cols-4">
            <div className="font-semibold">
              {dictionary.workflow.fields.createdByMembership}
            </div>
            <div className="col-span-2 flex items-baseline gap-4 lg:col-span-3">
              <MembershipLink
                membership={workflow.createdByMembership}
                context={context}
              />
              <CopyToClipboardButton
                text={membershipLabel(
                  workflow.createdByMembership,
                  context.dictionary,
                )}
                dictionary={context.dictionary}
              />
            </div>
          </div>
        )}

        {workflow.createdAt != null && (
          <div className="grid grid-cols-3 gap-4 py-4 text-sm lg:grid-cols-4">
            <div className="font-semibold">
              {dictionary.workflow.fields.createdAt}
            </div>
            <div className="col-span-2 flex items-baseline gap-4 lg:col-span-3">
              <span>{formatDatetime(workflow.createdAt, dictionary)}</span>
              <CopyToClipboardButton
                text={formatDatetime(workflow.createdAt, dictionary)}
                dictionary={context.dictionary}
              />
            </div>
          </div>
        )}

        {workflow.updatedByMembership != null && (
          <div className="grid grid-cols-3 gap-4 py-4 text-sm lg:grid-cols-4">
            <div className="font-semibold">
              {dictionary.workflow.fields.updatedByMembership}
            </div>
            <div className="col-span-2 flex items-baseline gap-4 lg:col-span-3">
              <MembershipLink
                membership={workflow.updatedByMembership}
                context={context}
              />
              <CopyToClipboardButton
                text={membershipLabel(
                  workflow.updatedByMembership,
                  context.dictionary,
                )}
                dictionary={context.dictionary}
              />
            </div>
          </div>
        )}

        {workflow.updatedAt != null && (
          <div className="grid grid-cols-3 gap-4 py-4 text-sm lg:grid-cols-4">
            <div className="font-semibold">
              {dictionary.workflow.fields.updatedAt}
            </div>
            <div className="col-span-2 flex items-baseline gap-4 lg:col-span-3">
              <span>{formatDatetime(workflow.updatedAt, dictionary)}</span>
              <CopyToClipboardButton
                text={formatDatetime(workflow.updatedAt, dictionary)}
                dictionary={context.dictionary}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
