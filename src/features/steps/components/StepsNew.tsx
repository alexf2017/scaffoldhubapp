'use client';

import { Steps } from '@prisma/client';
import { useRouter } from 'next/navigation';
import React from 'react';
import { StepsForm } from 'src/features/steps/components/StepsForm';
import { AppContext } from 'src/shared/controller/appContext';

export default function StepsNew({ context }: { context: AppContext }) {
  const router = useRouter();

  return (
    <StepsForm
      context={context}
      onSuccess={(steps: Steps) =>
        router.push(`/steps/${steps.id}`)
      }
      onCancel={() => router.push('/steps')}
    />
  );
}
