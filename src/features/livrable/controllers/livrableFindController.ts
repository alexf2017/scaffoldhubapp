import { RouteConfig } from '@asteasolutions/zod-to-openapi';
import { livrableFindSchema } from 'src/features/livrable/livrableSchemas';
import { permissions } from 'src/features/permissions';
import { validateHasPermission } from 'src/features/security';
import { prismaAuth } from 'src/prisma';
import { AppContext } from 'src/shared/controller/appContext';
import { filePopulateDownloadUrlInTree } from 'src/features/file/fileService';

export const livrableFindApiDoc: RouteConfig = {
  method: 'get',
  path: '/api/livrable/{id}',
  request: {
    params: livrableFindSchema,
  },
  responses: {
    200: {
      description: 'Livrable',
    },
  },
};

export async function livrableFindController(
  params: unknown,
  context: AppContext,
) {
  const { currentTenant } = validateHasPermission(
    permissions.livrableRead,
    context,
  );

  const { id } = livrableFindSchema.parse(params);

  const prisma = prismaAuth(context);

  let livrable = await prisma.livrable.findUnique({
    where: {
      id_tenantId: {
        id,
        tenantId: currentTenant.id,
      },
    },
    include: {
      projet: true,
      statusname: true,
      wfs: true,
      createdByMembership: true,
      updatedByMembership: true,
    },
  });

  livrable = await filePopulateDownloadUrlInTree(livrable);

  return livrable;
}
