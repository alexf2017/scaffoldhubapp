import { WorkflowStep } from '@prisma/client';
import Link from 'next/link';
import React from 'react';
import { workflowStepLabel } from 'src/features/workflowStep/workflowStepLabel';
import { permissions } from 'src/features/permissions';
import { hasPermission } from 'src/features/security';
import { AppContext } from 'src/shared/controller/appContext';
import { cn } from 'src/shared/components/cn';

export function WorkflowStepLink({
  workflowStep,
  context,
  className,
}: {
  workflowStep?: Partial<WorkflowStep>;
  context: AppContext;
  className?: string;
}) {
  if (!workflowStep) {
    return '';
  }

  const hasPermissionToRead = hasPermission(permissions.workflowStepRead, context);

  if (!hasPermissionToRead) {
    return <span className={className}>{workflowStepLabel(workflowStep, context.dictionary)}</span>;
  }

  return (
    <Link
      href={`/workflow-step/${workflowStep.id}`}
      className={cn(
        'text-blue-500 hover:text-blue-400 hover:underline focus:text-blue-400 dark:text-blue-400',
        className,
      )}
      prefetch={false}
    >
      {workflowStepLabel(workflowStep, context.dictionary)}
    </Link>
  );
}
