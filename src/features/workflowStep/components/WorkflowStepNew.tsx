'use client';

import { WorkflowStep } from '@prisma/client';
import { useRouter } from 'next/navigation';
import React from 'react';
import { WorkflowStepForm } from 'src/features/workflowStep/components/WorkflowStepForm';
import { AppContext } from 'src/shared/controller/appContext';

export default function WorkflowStepNew({ context }: { context: AppContext }) {
  const router = useRouter();

  return (
    <WorkflowStepForm
      context={context}
      onSuccess={(workflowStep: WorkflowStep) =>
        router.push(`/workflow-step/${workflowStep.id}`)
      }
      onCancel={() => router.push('/workflow-step')}
    />
  );
}
