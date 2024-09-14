'use client';

import { Projet } from '@prisma/client';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { ProjetForm } from 'src/features/projet/components/ProjetForm';
import { projetFindApiCall } from 'src/features/projet/projetApiCalls';
import { projetLabel } from 'src/features/projet/projetLabel';
import { ProjetWithRelationships } from 'src/features/projet/projetSchemas';
import Breadcrumb from 'src/shared/components/Breadcrumb';
import { toast } from 'src/shared/components/ui/use-toast';
import { AppContext } from 'src/shared/controller/appContext';
import { Logger } from 'src/shared/lib/Logger';

export default function ProjetEdit({
  context,
  id,
}: {
  context: AppContext;
  id: string;
}) {
  const dictionary = context.dictionary;
  const router = useRouter();
  const [projet, setProjet] = useState<ProjetWithRelationships>();

  useEffect(() => {
    async function doFetch() {
      try {
        setProjet(undefined);
        const projet = await projetFindApiCall(id);

        if (!projet) {
          router.push('/projet');
        }

        setProjet(projet);
      } catch (error: any) {
        Logger.error(error);
        toast({
          description: error.message || dictionary.shared.errors.unknown,
          variant: 'destructive',
        });
        router.push('/projet');
      }
    }

    doFetch();
  }, [id, router, dictionary.shared.errors.unknown]);

  if (!projet) {
    return null;
  }

  return (
    <div className="flex flex-1 flex-col">
      <Breadcrumb
        items={[
          [dictionary.projet.list.menu, '/projet'],
          [projetLabel(projet, context.dictionary), `/projet/${projet?.id}`],
          [dictionary.projet.edit.menu],
        ]}
      />
      <div className="my-10">
        <ProjetForm
          context={context}
          projet={projet}
          onSuccess={(projet: Projet) => router.push(`/projet/${projet.id}`)}
          onCancel={() => router.push('/projet')}
        />
      </div>
    </div>
  );
}
