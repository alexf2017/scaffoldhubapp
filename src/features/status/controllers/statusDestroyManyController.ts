import { RouteConfig } from '@asteasolutions/zod-to-openapi';
import { statusDestroyManyInputSchema } from 'src/features/status/statusSchemas';
import { permissions } from 'src/features/permissions';
import { validateHasPermission } from 'src/features/security';
import { prismaAuth } from 'src/prisma';
import { AppContext } from 'src/shared/controller/appContext';
import Error400 from 'src/shared/errors/Error400';
import { formatTranslation } from 'src/translation/formatTranslation';

export const statusDestroyManyApiDoc: RouteConfig = {
  method: 'delete',
  path: '/api/status',
  request: {
    query: statusDestroyManyInputSchema,
  },
  responses: {
    200: {
      description: 'OK',
    },
  },
};

export async function statusDestroyManyController(
  query: unknown,
  context: AppContext,
) {
  const { currentTenant } = validateHasPermission(
    permissions.statusDestroy,
    context,
  );

  const { ids } = statusDestroyManyInputSchema.parse(query);

  const prisma = prismaAuth(context);

  if (
    await prisma.livrable.count({
      where: { statusname: { id: { in: ids } } },
    })
  ) {
    throw new Error400(
      formatTranslation(
        context.dictionary.shared.errors.cannotDeleteReferenced,
        context.dictionary.livrable.label,
        context.dictionary.livrable.fields.statusname,
      ),
    );
  }

  return await prisma.status.deleteMany({
    where: {
      id: { in: ids },
      tenantId: currentTenant.id,
    },
  });
}
