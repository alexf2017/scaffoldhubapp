import { Steps } from '@prisma/client';
import Link from 'next/link';
import React from 'react';
import { stepsLabel } from 'src/features/steps/stepsLabel';
import { permissions } from 'src/features/permissions';
import { hasPermission } from 'src/features/security';
import { AppContext } from 'src/shared/controller/appContext';
import { cn } from 'src/shared/components/cn';

export function StepsLink({
  steps,
  context,
  className,
}: {
  steps?: Partial<Steps>;
  context: AppContext;
  className?: string;
}) {
  if (!steps) {
    return '';
  }

  const hasPermissionToRead = hasPermission(permissions.stepsRead, context);

  if (!hasPermissionToRead) {
    return <span className={className}>{stepsLabel(steps, context.dictionary)}</span>;
  }

  return (
    <Link
      href={`/steps/${steps.id}`}
      className={cn(
        'text-blue-500 hover:text-blue-400 hover:underline focus:text-blue-400 dark:text-blue-400',
        className,
      )}
      prefetch={false}
    >
      {stepsLabel(steps, context.dictionary)}
    </Link>
  );
}
