'use client';

import { Livrable } from '@prisma/client';
import { useRouter } from 'next/navigation';
import React from 'react';
import { LivrableForm } from 'src/features/livrable/components/LivrableForm';
import { AppContext } from 'src/shared/controller/appContext';

export default function LivrableNew({ context }: { context: AppContext }) {
  const router = useRouter();

  return (
    <LivrableForm
      context={context}
      onSuccess={(livrable: Livrable) =>
        router.push(`/livrable/${livrable.id}`)
      }
      onCancel={() => router.push('/livrable')}
    />
  );
}
