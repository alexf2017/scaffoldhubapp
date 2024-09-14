'use client';

import { Status } from '@prisma/client';
import { useRouter } from 'next/navigation';
import React from 'react';
import { StatusForm } from 'src/features/status/components/StatusForm';
import { AppContext } from 'src/shared/controller/appContext';

export default function StatusNew({ context }: { context: AppContext }) {
  const router = useRouter();

  return (
    <StatusForm
      context={context}
      onSuccess={(status: Status) =>
        router.push(`/status/${status.id}`)
      }
      onCancel={() => router.push('/status')}
    />
  );
}
