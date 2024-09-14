import { RouteConfig } from '@asteasolutions/zod-to-openapi';
import { projetFindSchema } from 'src/features/projet/projetSchemas';
import { permissions } from 'src/features/permissions';
import { validateHasPermission } from 'src/features/security';
import { prismaAuth } from 'src/prisma';
import { AppContext } from 'src/shared/controller/appContext';
import { filePopulateDownloadUrlInTree } from 'src/features/file/fileService';

export const projetFindApiDoc: RouteConfig = {
  method: 'get',
  path: '/api/projet/{id}',
  request: {
    params: projetFindSchema,
  },
  responses: {
    200: {
      description: 'Projet',
    },
  },
};

export async function projetFindController(
  params: unknown,
  context: AppContext,
) {
  const { currentTenant } = validateHasPermission(
    permissions.projetRead,
    context,
  );

  const { id } = projetFindSchema.parse(params);

  const prisma = prismaAuth(context);

  let projet = await prisma.projet.findUnique({
    where: {
      id_tenantId: {
        id,
        tenantId: currentTenant.id,
      },
    },
    include: {
      livrable: true,
      createdByMembership: true,
      updatedByMembership: true,
    },
  });

  projet = await filePopulateDownloadUrlInTree(projet);

  return projet;
}
