import { Campany } from '@prisma/client';
import Link from 'next/link';
import React from 'react';
import { campanyLabel } from 'src/features/campany/campanyLabel';
import { permissions } from 'src/features/permissions';
import { hasPermission } from 'src/features/security';
import { AppContext } from 'src/shared/controller/appContext';
import { cn } from 'src/shared/components/cn';

export function CampanyLink({
  campany,
  context,
  className,
}: {
  campany?: Partial<Campany>;
  context: AppContext;
  className?: string;
}) {
  if (!campany) {
    return '';
  }

  const hasPermissionToRead = hasPermission(permissions.campanyRead, context);

  if (!hasPermissionToRead) {
    return <span className={className}>{campanyLabel(campany, context.dictionary)}</span>;
  }

  return (
    <Link
      href={`/campany/${campany.id}`}
      className={cn(
        'text-blue-500 hover:text-blue-400 hover:underline focus:text-blue-400 dark:text-blue-400',
        className,
      )}
      prefetch={false}
    >
      {campanyLabel(campany, context.dictionary)}
    </Link>
  );
}
