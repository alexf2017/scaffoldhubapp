import { RouteConfig } from '@asteasolutions/zod-to-openapi';
import { campanyFindSchema } from 'src/features/campany/campanySchemas';
import { permissions } from 'src/features/permissions';
import { validateHasPermission } from 'src/features/security';
import { prismaAuth } from 'src/prisma';
import { AppContext } from 'src/shared/controller/appContext';
import { filePopulateDownloadUrlInTree } from 'src/features/file/fileService';

export const campanyFindApiDoc: RouteConfig = {
  method: 'get',
  path: '/api/campany/{id}',
  request: {
    params: campanyFindSchema,
  },
  responses: {
    200: {
      description: 'Campany',
    },
  },
};

export async function campanyFindController(
  params: unknown,
  context: AppContext,
) {
  const { currentTenant } = validateHasPermission(
    permissions.campanyRead,
    context,
  );

  const { id } = campanyFindSchema.parse(params);

  const prisma = prismaAuth(context);

  let campany = await prisma.campany.findUnique({
    where: {
      id_tenantId: {
        id,
        tenantId: currentTenant.id,
      },
    },
    include: {

      createdByMembership: true,
      updatedByMembership: true,
    },
  });

  campany = await filePopulateDownloadUrlInTree(campany);

  return campany;
}
