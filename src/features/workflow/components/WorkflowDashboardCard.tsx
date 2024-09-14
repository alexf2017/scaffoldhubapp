'use client';

import { workflowFindManyApiCall } from 'src/features/workflow/workflowApiCalls';
import DashboardCountCard from 'src/features/dashboard/components/DashboardCountCard';
import { permissions } from 'src/features/permissions';
import { hasPermission } from 'src/features/security';
import { AppContext } from 'src/shared/controller/appContext';
import { LuLayoutGrid } from 'react-icons/lu';

export function WorkflowDashboardCard({ context }: { context: AppContext }) {
  const { dictionary } = context;

  if (!hasPermission(permissions.workflowRead, context)) {
    return null;
  }

  return (
    <DashboardCountCard
      queryFn={async (signal?: AbortSignal) => {
        const { count } = await workflowFindManyApiCall(
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
      id="workflowDashboardCard"
      queryKey={['workflow', 'count']}
      title={dictionary.workflow.dashboardCard.title}
      Icon={LuLayoutGrid}
    />
  );
}
