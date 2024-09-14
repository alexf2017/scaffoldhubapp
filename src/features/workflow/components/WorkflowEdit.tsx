'use client';

import { Workflow } from '@prisma/client';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { WorkflowForm } from 'src/features/workflow/components/WorkflowForm';
import { workflowFindApiCall } from 'src/features/workflow/workflowApiCalls';
import { workflowLabel } from 'src/features/workflow/workflowLabel';
import { WorkflowWithRelationships } from 'src/features/workflow/workflowSchemas';
import Breadcrumb from 'src/shared/components/Breadcrumb';
import { toast } from 'src/shared/components/ui/use-toast';
import { AppContext } from 'src/shared/controller/appContext';
import { Logger } from 'src/shared/lib/Logger';

export default function WorkflowEdit({
  context,
  id,
}: {
  context: AppContext;
  id: string;
}) {
  const dictionary = context.dictionary;
  const router = useRouter();
  const [workflow, setWorkflow] = useState<WorkflowWithRelationships>();

  useEffect(() => {
    async function doFetch() {
      try {
        setWorkflow(undefined);
        const workflow = await workflowFindApiCall(id);

        if (!workflow) {
          router.push('/workflow');
        }

        setWorkflow(workflow);
      } catch (error: any) {
        Logger.error(error);
        toast({
          description: error.message || dictionary.shared.errors.unknown,
          variant: 'destructive',
        });
        router.push('/workflow');
      }
    }

    doFetch();
  }, [id, router, dictionary.shared.errors.unknown]);

  if (!workflow) {
    return null;
  }

  return (
    <div className="flex flex-1 flex-col">
      <Breadcrumb
        items={[
          [dictionary.workflow.list.menu, '/workflow'],
          [workflowLabel(workflow, context.dictionary), `/workflow/${workflow?.id}`],
          [dictionary.workflow.edit.menu],
        ]}
      />
      <div className="my-10">
        <WorkflowForm
          context={context}
          workflow={workflow}
          onSuccess={(workflow: Workflow) => router.push(`/workflow/${workflow.id}`)}
          onCancel={() => router.push('/workflow')}
        />
      </div>
    </div>
  );
}
