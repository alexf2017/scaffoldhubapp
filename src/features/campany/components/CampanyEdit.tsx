'use client';

import { Campany } from '@prisma/client';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { CampanyForm } from 'src/features/campany/components/CampanyForm';
import { campanyFindApiCall } from 'src/features/campany/campanyApiCalls';
import { campanyLabel } from 'src/features/campany/campanyLabel';
import { CampanyWithRelationships } from 'src/features/campany/campanySchemas';
import Breadcrumb from 'src/shared/components/Breadcrumb';
import { toast } from 'src/shared/components/ui/use-toast';
import { AppContext } from 'src/shared/controller/appContext';
import { Logger } from 'src/shared/lib/Logger';

export default function CampanyEdit({
  context,
  id,
}: {
  context: AppContext;
  id: string;
}) {
  const dictionary = context.dictionary;
  const router = useRouter();
  const [campany, setCampany] = useState<CampanyWithRelationships>();

  useEffect(() => {
    async function doFetch() {
      try {
        setCampany(undefined);
        const campany = await campanyFindApiCall(id);

        if (!campany) {
          router.push('/campany');
        }

        setCampany(campany);
      } catch (error: any) {
        Logger.error(error);
        toast({
          description: error.message || dictionary.shared.errors.unknown,
          variant: 'destructive',
        });
        router.push('/campany');
      }
    }

    doFetch();
  }, [id, router, dictionary.shared.errors.unknown]);

  if (!campany) {
    return null;
  }

  return (
    <div className="flex flex-1 flex-col">
      <Breadcrumb
        items={[
          [dictionary.campany.list.menu, '/campany'],
          [campanyLabel(campany, context.dictionary), `/campany/${campany?.id}`],
          [dictionary.campany.edit.menu],
        ]}
      />
      <div className="my-10">
        <CampanyForm
          context={context}
          campany={campany}
          onSuccess={(campany: Campany) => router.push(`/campany/${campany.id}`)}
          onCancel={() => router.push('/campany')}
        />
      </div>
    </div>
  );
}
