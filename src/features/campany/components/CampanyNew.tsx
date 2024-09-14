'use client';

import { Campany } from '@prisma/client';
import { useRouter } from 'next/navigation';
import React from 'react';
import { CampanyForm } from 'src/features/campany/components/CampanyForm';
import { AppContext } from 'src/shared/controller/appContext';

export default function CampanyNew({ context }: { context: AppContext }) {
  const router = useRouter();

  return (
    <CampanyForm
      context={context}
      onSuccess={(campany: Campany) =>
        router.push(`/campany/${campany.id}`)
      }
      onCancel={() => router.push('/campany')}
    />
  );
}
