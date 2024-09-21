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
  const currentMembershipId = context.currentMembership?.id;
  const currentMembershipRole = context.currentMembership?.roles[0];

  const { id } = livrableUpdateParamsInputSchema.parse(params);

  const data = livrableUpdateBodyInputSchema.parse(body);

  const prisma = prismaAuth(context);

  let updateData = {};

  // If the current user is an admin, allow full update
  if (currentMembershipRole === 'admin') {
    updateData = {
      title: data.title,
      document: data.document,
      projet: prismaRelationship.connectOrDisconnectOne(data.projet),
      statusname: prismaRelationship.connectOrDisconnectOne(data.statusname),
    };
  }
  // If the current user is an employer, only allow updating the document
  else if (currentMembershipRole === 'employer') {
    updateData = {
      document: data.document,
    };
  }
  await prisma.livrable.update({
    where: {
      id_tenantId: {
        id,
        tenantId: currentTenant.id,
      },
    },
    data: updateData,
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
