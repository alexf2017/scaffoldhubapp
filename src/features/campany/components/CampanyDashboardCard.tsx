'use client';

import { campanyFindManyApiCall } from 'src/features/campany/campanyApiCalls';
import DashboardCountCard from 'src/features/dashboard/components/DashboardCountCard';
import { permissions } from 'src/features/permissions';
import { hasPermission } from 'src/features/security';
import { AppContext } from 'src/shared/controller/appContext';
import { LuLayoutGrid } from 'react-icons/lu';

export function CampanyDashboardCard({ context }: { context: AppContext }) {
  const { dictionary } = context;

  if (!hasPermission(permissions.campanyRead, context)) {
    return null;
  }

  return (
    <DashboardCountCard
      queryFn={async (signal?: AbortSignal) => {
        const { count } = await campanyFindManyApiCall(
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
      id="campanyDashboardCard"
      queryKey={['campany', 'count']}
      title={dictionary.campany.dashboardCard.title}
      Icon={LuLayoutGrid}
    />
  );
}
