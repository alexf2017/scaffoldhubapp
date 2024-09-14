'use client';

import { WorkflowStep } from '@prisma/client';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { WorkflowStepForm } from 'src/features/workflowStep/components/WorkflowStepForm';
import { workflowStepFindApiCall } from 'src/features/workflowStep/workflowStepApiCalls';
import { workflowStepLabel } from 'src/features/workflowStep/workflowStepLabel';
import { WorkflowStepWithRelationships } from 'src/features/workflowStep/workflowStepSchemas';
import Breadcrumb from 'src/shared/components/Breadcrumb';
import { toast } from 'src/shared/components/ui/use-toast';
import { AppContext } from 'src/shared/controller/appContext';
import { Logger } from 'src/shared/lib/Logger';

export default function WorkflowStepEdit({
  context,
  id,
}: {
  context: AppContext;
  id: string;
}) {
  const dictionary = context.dictionary;
  const router = useRouter();
  const [workflowStep, setWorkflowStep] = useState<WorkflowStepWithRelationships>();

  useEffect(() => {
    async function doFetch() {
      try {
        setWorkflowStep(undefined);
        const workflowStep = await workflowStepFindApiCall(id);

        if (!workflowStep) {
          router.push('/workflow-step');
        }

        setWorkflowStep(workflowStep);
      } catch (error: any) {
        Logger.error(error);
        toast({
          description: error.message || dictionary.shared.errors.unknown,
          variant: 'destructive',
        });
        router.push('/workflow-step');
      }
    }

    doFetch();
  }, [id, router, dictionary.shared.errors.unknown]);

  if (!workflowStep) {
    return null;
  }

  return (
    <div className="flex flex-1 flex-col">
      <Breadcrumb
        items={[
          [dictionary.workflowStep.list.menu, '/workflow-step'],
          [workflowStepLabel(workflowStep, context.dictionary), `/workflow-step/${workflowStep?.id}`],
          [dictionary.workflowStep.edit.menu],
        ]}
      />
      <div className="my-10">
        <WorkflowStepForm
          context={context}
          workflowStep={workflowStep}
          onSuccess={(workflowStep: WorkflowStep) => router.push(`/workflow-step/${workflowStep.id}`)}
          onCancel={() => router.push('/workflow-step')}
        />
      </div>
    </div>
  );
}
