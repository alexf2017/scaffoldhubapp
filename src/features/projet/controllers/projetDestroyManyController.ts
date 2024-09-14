import { RouteConfig } from '@asteasolutions/zod-to-openapi';
import { projetDestroyManyInputSchema } from 'src/features/projet/projetSchemas';
import { permissions } from 'src/features/permissions';
import { validateHasPermission } from 'src/features/security';
import { prismaAuth } from 'src/prisma';
import { AppContext } from 'src/shared/controller/appContext';
import Error400 from 'src/shared/errors/Error400';
import { formatTranslation } from 'src/translation/formatTranslation';

export const projetDestroyManyApiDoc: RouteConfig = {
  method: 'delete',
  path: '/api/projet',
  request: {
    query: projetDestroyManyInputSchema,
  },
  responses: {
    200: {
      description: 'OK',
    },
  },
};

export async function projetDestroyManyController(
  query: unknown,
  context: AppContext,
) {
  const { currentTenant } = validateHasPermission(
    permissions.projetDestroy,
    context,
  );

  const { ids } = projetDestroyManyInputSchema.parse(query);

  const prisma = prismaAuth(context);



  return await prisma.projet.deleteMany({
    where: {
      id: { in: ids },
      tenantId: currentTenant.id,
    },
  });
}
