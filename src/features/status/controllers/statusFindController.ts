import { RouteConfig } from '@asteasolutions/zod-to-openapi';
import { statusFindSchema } from 'src/features/status/statusSchemas';
import { permissions } from 'src/features/permissions';
import { validateHasPermission } from 'src/features/security';
import { prismaAuth } from 'src/prisma';
import { AppContext } from 'src/shared/controller/appContext';
import { filePopulateDownloadUrlInTree } from 'src/features/file/fileService';

export const statusFindApiDoc: RouteConfig = {
  method: 'get',
  path: '/api/status/{id}',
  request: {
    params: statusFindSchema,
  },
  responses: {
    200: {
      description: 'Status',
    },
  },
};

export async function statusFindController(
  params: unknown,
  context: AppContext,
) {
  const { currentTenant } = validateHasPermission(
    permissions.statusRead,
    context,
  );

  const { id } = statusFindSchema.parse(params);

  const prisma = prismaAuth(context);

  let status = await prisma.status.findUnique({
    where: {
      id_tenantId: {
        id,
        tenantId: currentTenant.id,
      },
    },
    include: {
      livrble: true,
      createdByMembership: true,
      updatedByMembership: true,
    },
  });

  status = await filePopulateDownloadUrlInTree(status);

  return status;
}
