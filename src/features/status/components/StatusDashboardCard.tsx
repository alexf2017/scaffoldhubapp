'use client';

import { statusFindManyApiCall } from 'src/features/status/statusApiCalls';
import DashboardCountCard from 'src/features/dashboard/components/DashboardCountCard';
import { permissions } from 'src/features/permissions';
import { hasPermission } from 'src/features/security';
import { AppContext } from 'src/shared/controller/appContext';
import { LuLayoutGrid } from 'react-icons/lu';

export function StatusDashboardCard({ context }: { context: AppContext }) {
  const { dictionary } = context;

  if (!hasPermission(permissions.statusRead, context)) {
    return null;
  }

  return (
    <DashboardCountCard
      queryFn={async (signal?: AbortSignal) => {
        const { count } = await statusFindManyApiCall(
          {
            take: 1,
            orderBy: {
              createdAt: 'desc',
            },
          },
          signal,
        );

        return count;
      }}
      id="statusDashboardCard"
      queryKey={['status', 'count']}
      title={dictionary.status.dashboardCard.title}
      Icon={LuLayoutGrid}
    />
  );
}
