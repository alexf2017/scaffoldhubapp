import { RouteConfig } from '@asteasolutions/zod-to-openapi';
import { livrableDestroyManyInputSchema } from 'src/features/livrable/livrableSchemas';
import { permissions } from 'src/features/permissions';
import { validateHasPermission } from 'src/features/security';
import { prismaAuth } from 'src/prisma';
import { AppContext } from 'src/shared/controller/appContext';
import Error400 from 'src/shared/errors/Error400';
import { formatTranslation } from 'src/translation/formatTranslation';

export const livrableDestroyManyApiDoc: RouteConfig = {
  method: 'delete',
  path: '/api/livrable',
  request: {
    query: livrableDestroyManyInputSchema,
  },
  responses: {
    200: {
      description: 'OK',
    },
  },
};

export async function livrableDestroyManyController(
  query: unknown,
  context: AppContext,
) {
  const { currentTenant } = validateHasPermission(
    permissions.livrableDestroy,
    context,
  );

  const { ids } = livrableDestroyManyInputSchema.parse(query);

  const prisma = prismaAuth(context);



  return await prisma.livrable.deleteMany({
    where: {
      id: { in: ids },
      tenantId: currentTenant.id,
    },
  });
}
