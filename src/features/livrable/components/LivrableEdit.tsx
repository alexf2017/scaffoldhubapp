'use client';

import { Livrable } from '@prisma/client';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { LivrableForm } from 'src/features/livrable/components/LivrableForm';
import { livrableFindApiCall } from 'src/features/livrable/livrableApiCalls';
import { livrableLabel } from 'src/features/livrable/livrableLabel';
import { LivrableWithRelationships } from 'src/features/livrable/livrableSchemas';
import Breadcrumb from 'src/shared/components/Breadcrumb';
import { toast } from 'src/shared/components/ui/use-toast';
import { AppContext } from 'src/shared/controller/appContext';
import { Logger } from 'src/shared/lib/Logger';

export default function LivrableEdit({
  context,
  id,
}: {
  context: AppContext;
  id: string;
}) {
  const dictionary = context.dictionary;
  const roleName = context.currentMembership?.roles[0];
  console.log('first', roleName)
  const router = useRouter();
  const [livrable, setLivrable] = useState<LivrableWithRelationships>();

  useEffect(() => {
    async function doFetch() {
      try {
        setLivrable(undefined);
        const livrable = await livrableFindApiCall(id);
        console.log('rrrrrrrrrrr', livrable)
        if (!livrable) {
          router.push('/livrable');
        }

        setLivrable(livrable);
      } catch (error: any) {
        Logger.error(error);
        toast({
          description: error.message || dictionary.shared.errors.unknown,
          variant: 'destructive',
        });
        router.push('/livrable');
      }
    }

    doFetch();
  }, [id, router, dictionary.shared.errors.unknown]);

  if (!livrable) {
    return null;
  }

  return (
    <div className="flex flex-1 flex-col">
      <Breadcrumb
        items={[
          [dictionary.livrable.list.menu, '/livrable'],
          [livrableLabel(livrable, context.dictionary), `/livrable/${livrable?.id}`],
          [dictionary.livrable.edit.menu],
        ]}
      />
      <div className="my-10">
        <LivrableForm
          context={context}
          livrable={livrable}
          roleName={roleName} // Pass the roleName to the form
          onSuccess={(livrable: Livrable) => router.push(`/livrable/${livrable.id}`)}
          onCancel={() => router.push('/livrable')}
        />
      </div>
    </div>
  );
}
