import { Workflow } from '@prisma/client';
import Link from 'next/link';
import React from 'react';
import { workflowLabel } from 'src/features/workflow/workflowLabel';
import { permissions } from 'src/features/permissions';
import { hasPermission } from 'src/features/security';
import { AppContext } from 'src/shared/controller/appContext';
import { cn } from 'src/shared/components/cn';

export function WorkflowLink({
  workflow,
  context,
  className,
}: {
  workflow?: Partial<Workflow>;
  context: AppContext;
  className?: string;
}) {
  if (!workflow) {
    return '';
  }

  const hasPermissionToRead = hasPermission(permissions.workflowRead, context);

  if (!hasPermissionToRead) {
    return <span className={className}>{workflowLabel(workflow, context.dictionary)}</span>;
  }

  return (
    <Link
      href={`/workflow/${workflow.id}`}
      className={cn(
        'text-blue-500 hover:text-blue-400 hover:underline focus:text-blue-400 dark:text-blue-400',
        className,
      )}
      prefetch={false}
    >
      {workflowLabel(workflow, context.dictionary)}
    </Link>
  );
}
