import { RouteConfig } from '@asteasolutions/zod-to-openapi';
import {
  projetUpdateBodyInputSchema,
  projetUpdateParamsInputSchema,
} from 'src/features/projet/projetSchemas';
import { filePopulateDownloadUrlInTree } from 'src/features/file/fileService';
import { permissions } from 'src/features/permissions';
import { validateHasPermission } from 'src/features/security';
import { prismaAuth } from 'src/prisma';
import { AppContext } from 'src/shared/controller/appContext';


export const projetUpdateApiDoc: RouteConfig = {
  method: 'put',
  path: '/api/projet/{id}',
  request: {
    params: projetUpdateParamsInputSchema,
    body: {
      content: {
        'application/json': {
          schema: projetUpdateBodyInputSchema,
        },
      },
    },
  },
  responses: {
    200: {
      description: 'Projet',
    },
  },
};

export async function projetUpdateController(
  params: unknown,
  body: unknown,
  context: AppContext,
) {
  const { currentTenant } = validateHasPermission(
    permissions.projetUpdate,
    context,
  );

  const { id } = projetUpdateParamsInputSchema.parse(params);

  const data = projetUpdateBodyInputSchema.parse(body);

  const prisma = prismaAuth(context);



  await prisma.projet.update({
    where: {
      id_tenantId: {
        id,
        tenantId: currentTenant.id,
      },
    },
    data: {
      title: data.title,
      isDone: data.isDone,
    },
  });

  let projet = await prisma.projet.findUniqueOrThrow({
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
