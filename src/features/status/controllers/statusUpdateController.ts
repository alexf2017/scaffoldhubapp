import { RouteConfig } from '@asteasolutions/zod-to-openapi';
import {
  statusUpdateBodyInputSchema,
  statusUpdateParamsInputSchema,
} from 'src/features/status/statusSchemas';
import { filePopulateDownloadUrlInTree } from 'src/features/file/fileService';
import { permissions } from 'src/features/permissions';
import { validateHasPermission } from 'src/features/security';
import { prismaAuth } from 'src/prisma';
import { AppContext } from 'src/shared/controller/appContext';


export const statusUpdateApiDoc: RouteConfig = {
  method: 'put',
  path: '/api/status/{id}',
  request: {
    params: statusUpdateParamsInputSchema,
    body: {
      content: {
        'application/json': {
          schema: statusUpdateBodyInputSchema,
        },
      },
    },
  },
  responses: {
    200: {
      description: 'Status',
    },
  },
};

export async function statusUpdateController(
  params: unknown,
  body: unknown,
  context: AppContext,
) {
  const { currentTenant } = validateHasPermission(
    permissions.statusUpdate,
    context,
  );

  const { id } = statusUpdateParamsInputSchema.parse(params);

  const data = statusUpdateBodyInputSchema.parse(body);

  const prisma = prismaAuth(context);



  await prisma.status.update({
    where: {
      id_tenantId: {
        id,
        tenantId: currentTenant.id,
      },
    },
    data: {
      name: data.name,
    },
  });

  let status = await prisma.status.findUniqueOrThrow({
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
