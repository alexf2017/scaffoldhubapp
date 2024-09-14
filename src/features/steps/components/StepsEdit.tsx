'use client';

import { Steps } from '@prisma/client';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { StepsForm } from 'src/features/steps/components/StepsForm';
import { stepsFindApiCall } from 'src/features/steps/stepsApiCalls';
import { stepsLabel } from 'src/features/steps/stepsLabel';
import { StepsWithRelationships } from 'src/features/steps/stepsSchemas';
import Breadcrumb from 'src/shared/components/Breadcrumb';
import { toast } from 'src/shared/components/ui/use-toast';
import { AppContext } from 'src/shared/controller/appContext';
import { Logger } from 'src/shared/lib/Logger';

export default function StepsEdit({
  context,
  id,
}: {
  context: AppContext;
  id: string;
}) {
  const dictionary = context.dictionary;
  const router = useRouter();
  const [steps, setSteps] = useState<StepsWithRelationships>();

  useEffect(() => {
    async function doFetch() {
      try {
        setSteps(undefined);
        const steps = await stepsFindApiCall(id);

        if (!steps) {
          router.push('/steps');
        }

        setSteps(steps);
      } catch (error: any) {
        Logger.error(error);
        toast({
          description: error.message || dictionary.shared.errors.unknown,
          variant: 'destructive',
        });
        router.push('/steps');
      }
    }

    doFetch();
  }, [id, router, dictionary.shared.errors.unknown]);

  if (!steps) {
    return null;
  }

  return (
    <div className="flex flex-1 flex-col">
      <Breadcrumb
        items={[
          [dictionary.steps.list.menu, '/steps'],
          [stepsLabel(steps, context.dictionary), `/steps/${steps?.id}`],
          [dictionary.steps.edit.menu],
        ]}
      />
      <div className="my-10">
        <StepsForm
          context={context}
          steps={steps}
          onSuccess={(steps: Steps) => router.push(`/steps/${steps.id}`)}
          onCancel={() => router.push('/steps')}
        />
      </div>
    </div>
  );
}
