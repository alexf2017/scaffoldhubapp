'use client';

import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { StepsWithRelationships } from 'src/features/steps/stepsSchemas';
import { stepsFindApiCall } from 'src/features/steps/stepsApiCalls';
import { StepsActions } from 'src/features/steps/components/StepsActions';
import { stepsPermissions } from 'src/features/steps/stepsPermissions';
import Breadcrumb from 'src/shared/components/Breadcrumb';
import { CopyToClipboardButton } from 'src/shared/components/CopyToClipboardButton';
import { toast } from 'src/shared/components/ui/use-toast';
import { AppContext } from 'src/shared/controller/appContext';
import { formatDatetime } from 'src/shared/lib/formatDateTime';
import { workflowLabel } from 'src/features/workflow/workflowLabel';
import { WorkflowLink } from 'src/features/workflow/components/WorkflowLink';
import { workflowStepLabel } from 'src/features/workflowStep/workflowStepLabel';
import { WorkflowStepLink } from 'src/features/workflowStep/components/WorkflowStepLink';
import { stepsLabel } from 'src/features/steps/stepsLabel';
import { MembershipLink } from 'src/features/membership/components/MembershipLink';
import { membershipLabel } from 'src/features/membership/membershipLabel';

export function StepsView({
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
    queryKey: ['steps', id],
    queryFn: async ({ signal }) => {
      return await stepsFindApiCall(id, signal);
    },
    initialData: () =>
      (
        queryClient.getQueryData([
          'steps',
        ]) as Array<StepsWithRelationships>
      )?.find((d) => d.id === id),
  });

  const steps = query.data;

  if (query.isSuccess && !steps) {
    router.push('/steps');
    return null;
  }

  if (query.isError) {
    toast({
      description:
        (query.error as any).message || dictionary.shared.errors.unknown,
      variant: 'destructive',
    });
    router.push('/steps');
    return null;
  }

  if (!steps) {
    return null;
  }

  return (
    <div className="flex flex-1 flex-col">
      <div className="flex items-center justify-between">
        <Breadcrumb
          items={[
            [dictionary.steps.list.menu, '/steps'],
            [stepsLabel(steps, dictionary)],
          ]}
        />
        <div className="flex gap-2">
          <StepsActions mode="view" steps={steps} context={context} />
        </div>
      </div>

      <div className="my-6 divide-y border-t">
        {Boolean(steps.title) && (
          <div className="grid grid-cols-3 gap-4 py-4 text-sm lg:grid-cols-4">
            <div className="font-semibold">
              {dictionary.steps.fields.title}
            </div>
            <div className="col-span-2 flex items-baseline gap-4 lg:col-span-3">
              <span>{steps.title}</span>
              <CopyToClipboardButton
                text={steps.title}
                dictionary={context.dictionary}
              />
            </div>
          </div>
        )}
        {steps.workflow?.length ? (<div className="grid grid-cols-3 gap-4 py-4 text-sm lg:grid-cols-4">
          <div className="font-semibold">
            {dictionary.steps.fields.workflow}
          </div>
          <div className="col-span-2 flex flex-col gap-1">
            {steps.workflow?.map((item) => {
              return (
                <div key={item?.id} className="flex items-center gap-4">
                  <WorkflowLink
                    workflow={item}
                    context={context}
                    className="whitespace-nowrap"
                  />
                  <CopyToClipboardButton
                    text={workflowLabel(item, context.dictionary)}
                    dictionary={context.dictionary}
                  />
                </div>
              );
            })}
          </div>
        </div>): null}
        {steps.steps?.length ? (<div className="grid grid-cols-3 gap-4 py-4 text-sm lg:grid-cols-4">
          <div className="font-semibold">
            {dictionary.steps.fields.steps}
          </div>
          <div className="col-span-2 flex flex-col gap-1">
            {steps.steps?.map((item) => {
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

        {steps.createdByMembership != null && (
          <div className="grid grid-cols-3 gap-4 py-4 text-sm lg:grid-cols-4">
            <div className="font-semibold">
              {dictionary.steps.fields.createdByMembership}
            </div>
            <div className="col-span-2 flex items-baseline gap-4 lg:col-span-3">
              <MembershipLink
                membership={steps.createdByMembership}
                context={context}
              />
              <CopyToClipboardButton
                text={membershipLabel(
                  steps.createdByMembership,
                  context.dictionary,
                )}
                dictionary={context.dictionary}
              />
            </div>
          </div>
        )}

        {steps.createdAt != null && (
          <div className="grid grid-cols-3 gap-4 py-4 text-sm lg:grid-cols-4">
            <div className="font-semibold">
              {dictionary.steps.fields.createdAt}
            </div>
            <div className="col-span-2 flex items-baseline gap-4 lg:col-span-3">
              <span>{formatDatetime(steps.createdAt, dictionary)}</span>
              <CopyToClipboardButton
                text={formatDatetime(steps.createdAt, dictionary)}
                dictionary={context.dictionary}
              />
            </div>
          </div>
        )}

        {steps.updatedByMembership != null && (
          <div className="grid grid-cols-3 gap-4 py-4 text-sm lg:grid-cols-4">
            <div className="font-semibold">
              {dictionary.steps.fields.updatedByMembership}
            </div>
            <div className="col-span-2 flex items-baseline gap-4 lg:col-span-3">
              <MembershipLink
                membership={steps.updatedByMembership}
                context={context}
              />
              <CopyToClipboardButton
                text={membershipLabel(
                  steps.updatedByMembership,
                  context.dictionary,
                )}
                dictionary={context.dictionary}
              />
            </div>
          </div>
        )}

        {steps.updatedAt != null && (
          <div className="grid grid-cols-3 gap-4 py-4 text-sm lg:grid-cols-4">
            <div className="font-semibold">
              {dictionary.steps.fields.updatedAt}
            </div>
            <div className="col-span-2 flex items-baseline gap-4 lg:col-span-3">
              <span>{formatDatetime(steps.updatedAt, dictionary)}</span>
              <CopyToClipboardButton
                text={formatDatetime(steps.updatedAt, dictionary)}
                dictionary={context.dictionary}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
