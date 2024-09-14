'use client';

import { Projet } from '@prisma/client';
import { useRouter } from 'next/navigation';
import React from 'react';
import { ProjetForm } from 'src/features/projet/components/ProjetForm';
import { AppContext } from 'src/shared/controller/appContext';

export default function ProjetNew({ context }: { context: AppContext }) {
  const router = useRouter();

  return (
    <ProjetForm
      context={context}
      onSuccess={(projet: Projet) =>
        router.push(`/projet/${projet.id}`)
      }
      onCancel={() => router.push('/projet')}
    />
  );
}
