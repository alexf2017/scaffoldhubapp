import { RouteConfig } from '@asteasolutions/zod-to-openapi';
import { campanyDestroyManyInputSchema } from 'src/features/campany/campanySchemas';
import { permissions } from 'src/features/permissions';
import { validateHasPermission } from 'src/features/security';
import { prismaAuth } from 'src/prisma';
import { AppContext } from 'src/shared/controller/appContext';
import Error400 from 'src/shared/errors/Error400';
import { formatTranslation } from 'src/translation/formatTranslation';

export const campanyDestroyManyApiDoc: RouteConfig = {
  method: 'delete',
  path: '/api/campany',
  request: {
    query: campanyDestroyManyInputSchema,
  },
  responses: {
    200: {
      description: 'OK',
    },
  },
};

export async function campanyDestroyManyController(
  query: unknown,
  context: AppContext,
) {
  const { currentTenant } = validateHasPermission(
    permissions.campanyDestroy,
    context,
  );

  const { ids } = campanyDestroyManyInputSchema.parse(query);

  const prisma = prismaAuth(context);



  return await prisma.campany.deleteMany({
    where: {
      id: { in: ids },
      tenantId: currentTenant.id,
    },
  });
}
