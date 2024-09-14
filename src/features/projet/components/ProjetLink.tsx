import { Projet } from '@prisma/client';
import Link from 'next/link';
import React from 'react';
import { projetLabel } from 'src/features/projet/projetLabel';
import { permissions } from 'src/features/permissions';
import { hasPermission } from 'src/features/security';
import { AppContext } from 'src/shared/controller/appContext';
import { cn } from 'src/shared/components/cn';

export function ProjetLink({
  projet,
  context,
  className,
}: {
  projet?: Partial<Projet>;
  context: AppContext;
  className?: string;
}) {
  if (!projet) {
    return '';
  }

  const hasPermissionToRead = hasPermission(permissions.projetRead, context);

  if (!hasPermissionToRead) {
    return <span className={className}>{projetLabel(projet, context.dictionary)}</span>;
  }

  return (
    <Link
      href={`/projet/${projet.id}`}
      className={cn(
        'text-blue-500 hover:text-blue-400 hover:underline focus:text-blue-400 dark:text-blue-400',
        className,
      )}
      prefetch={false}
    >
      {projetLabel(projet, context.dictionary)}
    </Link>
  );
}
