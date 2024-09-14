import { RouteConfig } from '@asteasolutions/zod-to-openapi';
import { stepsDestroyManyInputSchema } from 'src/features/steps/stepsSchemas';
import { permissions } from 'src/features/permissions';
import { validateHasPermission } from 'src/features/security';
import { prismaAuth } from 'src/prisma';
import { AppContext } from 'src/shared/controller/appContext';
import Error400 from 'src/shared/errors/Error400';
import { formatTranslation } from 'src/translation/formatTranslation';

export const stepsDestroyManyApiDoc: RouteConfig = {
  method: 'delete',
  path: '/api/steps',
  request: {
    query: stepsDestroyManyInputSchema,
  },
  responses: {
    200: {
      description: 'OK',
    },
  },
};

export async function stepsDestroyManyController(
  query: unknown,
  context: AppContext,
) {
  const { currentTenant } = validateHasPermission(
    permissions.stepsDestroy,
    context,
  );

  const { ids } = stepsDestroyManyInputSchema.parse(query);

  const prisma = prismaAuth(context);



  return await prisma.steps.deleteMany({
    where: {
      id: { in: ids },
      tenantId: currentTenant.id,
    },
  });
}
