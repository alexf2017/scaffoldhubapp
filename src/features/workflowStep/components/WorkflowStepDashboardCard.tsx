'use client';

import { workflowStepFindManyApiCall } from 'src/features/workflowStep/workflowStepApiCalls';
import DashboardCountCard from 'src/features/dashboard/components/DashboardCountCard';
import { permissions } from 'src/features/permissions';
import { hasPermission } from 'src/features/security';
import { AppContext } from 'src/shared/controller/appContext';
import { LuLayoutGrid } from 'react-icons/lu';

export function WorkflowStepDashboardCard({ context }: { context: AppContext }) {
  const { dictionary } = context;

  if (!hasPermission(permissions.workflowStepRead, context)) {
    return null;
  }

  return (
    <DashboardCountCard
      queryFn={async (signal?: AbortSignal) => {
        const { count } = await workflowStepFindManyApiCall(
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
      id="workflowStepDashboardCard"
      queryKey={['workflowStep', 'count']}
      title={dictionary.workflowStep.dashboardCard.title}
      Icon={LuLayoutGrid}
    />
  );
}
