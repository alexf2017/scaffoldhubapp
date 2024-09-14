import { RouteConfig } from '@asteasolutions/zod-to-openapi';
import {
  livrableUpdateBodyInputSchema,
  livrableUpdateParamsInputSchema,
} from 'src/features/livrable/livrableSchemas';
import { filePopulateDownloadUrlInTree } from 'src/features/file/fileService';
import { permissions } from 'src/features/permissions';
import { validateHasPermission } from 'src/features/security';
import { prismaAuth } from 'src/prisma';
import { AppContext } from 'src/shared/controller/appContext';
import { prismaRelationship } from 'src/prisma/prismaRelationship';

export const livrableUpdateApiDoc: RouteConfig = {
  method: 'put',
  path: '/api/livrable/{id}',
  request: {
    params: livrableUpdateParamsInputSchema,
    body: {
      content: {
        'application/json': {
          schema: livrableUpdateBodyInputSchema,
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

export async function livrableUpdateController(
  params: unknown,
  body: unknown,
  context: AppContext,
) {
  const { currentTenant } = validateHasPermission(
    permissions.livrableUpdate,
    context,
  );

  const { id } = livrableUpdateParamsInputSchema.parse(params);

  const data = livrableUpdateBodyInputSchema.parse(body);

  const prisma = prismaAuth(context);



  await prisma.livrable.update({
    where: {
      id_tenantId: {
        id,
        tenantId: currentTenant.id,
      },
    },
    data: {
      title: data.title,
      document: data.document,
      projet: prismaRelationship.connectOrDisconnectOne(data.projet),
      statusname: prismaRelationship.connectOrDisconnectOne(data.statusname),
    },
  });

  let livrable = await prisma.livrable.findUniqueOrThrow({
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
