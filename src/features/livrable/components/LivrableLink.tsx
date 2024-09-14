import { Livrable } from '@prisma/client';
import Link from 'next/link';
import React from 'react';
import { livrableLabel } from 'src/features/livrable/livrableLabel';
import { permissions } from 'src/features/permissions';
import { hasPermission } from 'src/features/security';
import { AppContext } from 'src/shared/controller/appContext';
import { cn } from 'src/shared/components/cn';

export function LivrableLink({
  livrable,
  context,
  className,
}: {
  livrable?: Partial<Livrable>;
  context: AppContext;
  className?: string;
}) {
  if (!livrable) {
    return '';
  }

  const hasPermissionToRead = hasPermission(permissions.livrableRead, context);

  if (!hasPermissionToRead) {
    return <span className={className}>{livrableLabel(livrable, context.dictionary)}</span>;
  }

  return (
    <Link
      href={`/livrable/${livrable.id}`}
      className={cn(
        'text-blue-500 hover:text-blue-400 hover:underline focus:text-blue-400 dark:text-blue-400',
        className,
      )}
      prefetch={false}
    >
      {livrableLabel(livrable, context.dictionary)}
    </Link>
  );
}
