import { RouteConfig } from '@asteasolutions/zod-to-openapi';
import { statusCreateInputSchema } from 'src/features/status/statusSchemas';
import { filePopulateDownloadUrlInTree } from 'src/features/file/fileService';
import { permissions } from 'src/features/permissions';
import { validateHasPermission } from 'src/features/security';
import { prismaAuth } from 'src/prisma';
import { AppContext } from 'src/shared/controller/appContext';


export const statusCreateApiDoc: RouteConfig = {
  method: 'post',
  path: '/api/status',
  request: {
    body: {
      content: {
        'application/json': {
          schema: statusCreateInputSchema,
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

export async function statusCreateController(
  body: unknown,
  context: AppContext,
) {
  validateHasPermission(permissions.statusCreate, context);
  return await statusCreate(body, context);
}

export async function statusCreate(body: unknown, context: AppContext) {
  const data = statusCreateInputSchema.parse(body);

  const prisma = prismaAuth(context);



  let status = await prisma.status.create({
    data: {
      name: data.name,
      importHash: data.importHash,
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
