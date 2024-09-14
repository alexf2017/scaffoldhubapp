'use client';

import { Workflow } from '@prisma/client';
import { useRouter } from 'next/navigation';
import React from 'react';
import { WorkflowForm } from 'src/features/workflow/components/WorkflowForm';
import { AppContext } from 'src/shared/controller/appContext';

export default function WorkflowNew({ context }: { context: AppContext }) {
  const router = useRouter();

  return (
    <WorkflowForm
      context={context}
      onSuccess={(workflow: Workflow) =>
        router.push(`/workflow/${workflow.id}`)
      }
      onCancel={() => router.push('/workflow')}
    />
  );
}
