'use client';

import { stepsFindManyApiCall } from 'src/features/steps/stepsApiCalls';
import DashboardCountCard from 'src/features/dashboard/components/DashboardCountCard';
import { permissions } from 'src/features/permissions';
import { hasPermission } from 'src/features/security';
import { AppContext } from 'src/shared/controller/appContext';
import { LuLayoutGrid } from 'react-icons/lu';

export function StepsDashboardCard({ context }: { context: AppContext }) {
  const { dictionary } = context;

  if (!hasPermission(permissions.stepsRead, context)) {
    return null;
  }

  return (
    <DashboardCountCard
      queryFn={async (signal?: AbortSignal) => {
        const { count } = await stepsFindManyApiCall(
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
      id="stepsDashboardCard"
      queryKey={['steps', 'count']}
      title={dictionary.steps.dashboardCard.title}
      Icon={LuLayoutGrid}
    />
  );
}
