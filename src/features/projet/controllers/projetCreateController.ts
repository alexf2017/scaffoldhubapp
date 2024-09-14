import { RouteConfig } from '@asteasolutions/zod-to-openapi';
import { projetCreateInputSchema } from 'src/features/projet/projetSchemas';
import { filePopulateDownloadUrlInTree } from 'src/features/file/fileService';
import { permissions } from 'src/features/permissions';
import { validateHasPermission } from 'src/features/security';
import { prismaAuth } from 'src/prisma';
import { AppContext } from 'src/shared/controller/appContext';


export const projetCreateApiDoc: RouteConfig = {
  method: 'post',
  path: '/api/projet',
  request: {
    body: {
      content: {
        'application/json': {
          schema: projetCreateInputSchema,
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

export async function projetCreateController(
  body: unknown,
  context: AppContext,
) {
  validateHasPermission(permissions.projetCreate, context);
  return await projetCreate(body, context);
}

export async function projetCreate(body: unknown, context: AppContext) {
  const data = projetCreateInputSchema.parse(body);

  const prisma = prismaAuth(context);



  let projet = await prisma.projet.create({
    data: {
      title: data.title,
      isDone: data.isDone,
      importHash: data.importHash,
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
