import { RouteConfig } from '@asteasolutions/zod-to-openapi';
import { workflowStepDestroyManyInputSchema } from 'src/features/workflowStep/workflowStepSchemas';
import { permissions } from 'src/features/permissions';
import { validateHasPermission } from 'src/features/security';
import { prismaAuth } from 'src/prisma';
import { AppContext } from 'src/shared/controller/appContext';
import Error400 from 'src/shared/errors/Error400';
import { formatTranslation } from 'src/translation/formatTranslation';

export const workflowStepDestroyManyApiDoc: RouteConfig = {
  method: 'delete',
  path: '/api/workflow-step',
  request: {
    query: workflowStepDestroyManyInputSchema,
  },
  responses: {
    200: {
      description: 'OK',
    },
  },
};

export async function workflowStepDestroyManyController(
  query: unknown,
  context: AppContext,
) {
  const { currentTenant } = validateHasPermission(
    permissions.workflowStepDestroy,
    context,
  );

  const { ids } = workflowStepDestroyManyInputSchema.parse(query);

  const prisma = prismaAuth(context);



  return await prisma.workflowStep.deleteMany({
    where: {
      id: { in: ids },
      tenantId: currentTenant.id,
    },
  });
}
