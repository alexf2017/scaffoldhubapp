import { RouteConfig } from '@asteasolutions/zod-to-openapi';
import { livrableCreateInputSchema } from 'src/features/livrable/livrableSchemas';
import { filePopulateDownloadUrlInTree } from 'src/features/file/fileService';
import { permissions } from 'src/features/permissions';
import { validateHasPermission } from 'src/features/security';
import { prismaAuth } from 'src/prisma';
import { AppContext } from 'src/shared/controller/appContext';
import { prismaRelationship } from 'src/prisma/prismaRelationship';

export const livrableCreateApiDoc: RouteConfig = {
  method: 'post',
  path: '/api/livrable',
  request: {
    body: {
      content: {
        'application/json': {
          schema: livrableCreateInputSchema,
        },
      },
    },
  },
  responses: {
    200: {
      description: 'Livrable',
    },
  },
};

export async function livrableCreateController(
  body: unknown,
  context: AppContext,
) {
  validateHasPermission(permissions.livrableCreate, context);
  return await livrableCreate(body, context);
}

export async function livrableCreate(body: unknown, context: AppContext) {
  const data = livrableCreateInputSchema.parse(body);

  const prisma = prismaAuth(context);



  let livrable = await prisma.livrable.create({
    data: {
      title: data.title,
      document: data.document,
      projet: prismaRelationship.connectOne(data.projet),
      statusname: prismaRelationship.connectOneOrThrow(data.statusname),
      importHash: data.importHash,
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
