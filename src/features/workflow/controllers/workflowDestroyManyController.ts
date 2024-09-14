import { RouteConfig } from '@asteasolutions/zod-to-openapi';
import { workflowDestroyManyInputSchema } from 'src/features/workflow/workflowSchemas';
import { permissions } from 'src/features/permissions';
import { validateHasPermission } from 'src/features/security';
import { prismaAuth } from 'src/prisma';
import { AppContext } from 'src/shared/controller/appContext';
import Error400 from 'src/shared/errors/Error400';
import { formatTranslation } from 'src/translation/formatTranslation';

export const workflowDestroyManyApiDoc: RouteConfig = {
  method: 'delete',
  path: '/api/workflow',
  request: {
    query: workflowDestroyManyInputSchema,
  },
  responses: {
    200: {
      description: 'OK',
    },
  },
};

export async function workflowDestroyManyController(
  query: unknown,
  context: AppContext,
) {
  const { currentTenant } = validateHasPermission(
    permissions.workflowDestroy,
    context,
  );

  const { ids } = workflowDestroyManyInputSchema.parse(query);

  const prisma = prismaAuth(context);



  return await prisma.workflow.deleteMany({
    where: {
      id: { in: ids },
      tenantId: currentTenant.id,
    },
  });
}
