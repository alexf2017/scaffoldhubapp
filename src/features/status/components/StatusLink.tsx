import { Status } from '@prisma/client';
import Link from 'next/link';
import React from 'react';
import { statusLabel } from 'src/features/status/statusLabel';
import { permissions } from 'src/features/permissions';
import { hasPermission } from 'src/features/security';
import { AppContext } from 'src/shared/controller/appContext';
import { cn } from 'src/shared/components/cn';

export function StatusLink({
  status,
  context,
  className,
}: {
  status?: Partial<Status>;
  context: AppContext;
  className?: string;
}) {
  if (!status) {
    return '';
  }

  const hasPermissionToRead = hasPermission(permissions.statusRead, context);

  if (!hasPermissionToRead) {
    return <span className={className}>{statusLabel(status, context.dictionary)}</span>;
  }

  return (
    <Link
      href={`/status/${status.id}`}
      className={cn(
        'text-blue-500 hover:text-blue-400 hover:underline focus:text-blue-400 dark:text-blue-400',
        className,
      )}
      prefetch={false}
    >
      {statusLabel(status, context.dictionary)}
    </Link>
  );
}
