'use client';

import { Status } from '@prisma/client';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { StatusForm } from 'src/features/status/components/StatusForm';
import { statusFindApiCall } from 'src/features/status/statusApiCalls';
import { statusLabel } from 'src/features/status/statusLabel';
import { StatusWithRelationships } from 'src/features/status/statusSchemas';
import Breadcrumb from 'src/shared/components/Breadcrumb';
import { toast } from 'src/shared/components/ui/use-toast';
import { AppContext } from 'src/shared/controller/appContext';
import { Logger } from 'src/shared/lib/Logger';

export default function StatusEdit({
  context,
  id,
}: {
  context: AppContext;
  id: string;
}) {
  const dictionary = context.dictionary;
  const router = useRouter();
  const [status, setStatus] = useState<StatusWithRelationships>();

  useEffect(() => {
    async function doFetch() {
      try {
        setStatus(undefined);
        const status = await statusFindApiCall(id);

        if (!status) {
          router.push('/status');
        }

        setStatus(status);
      } catch (error: any) {
        Logger.error(error);
        toast({
          description: error.message || dictionary.shared.errors.unknown,
          variant: 'destructive',
        });
        router.push('/status');
      }
    }

    doFetch();
  }, [id, router, dictionary.shared.errors.unknown]);

  if (!status) {
    return null;
  }

  return (
    <div className="flex flex-1 flex-col">
      <Breadcrumb
        items={[
          [dictionary.status.list.menu, '/status'],
          [statusLabel(status, context.dictionary), `/status/${status?.id}`],
          [dictionary.status.edit.menu],
        ]}
      />
      <div className="my-10">
        <StatusForm
          context={context}
          status={status}
          onSuccess={(status: Status) => router.push(`/status/${status.id}`)}
          onCancel={() => router.push('/status')}
        />
      </div>
    </div>
  );
}
