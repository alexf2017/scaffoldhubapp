import { RouteConfig } from '@asteasolutions/zod-to-openapi';
import {
  campanyUpdateBodyInputSchema,
  campanyUpdateParamsInputSchema,
} from 'src/features/campany/campanySchemas';
import { filePopulateDownloadUrlInTree } from 'src/features/file/fileService';
import { permissions } from 'src/features/permissions';
import { validateHasPermission } from 'src/features/security';
import { prismaAuth } from 'src/prisma';
import { AppContext } from 'src/shared/controller/appContext';


export const campanyUpdateApiDoc: RouteConfig = {
  method: 'put',
  path: '/api/campany/{id}',
  request: {
    params: campanyUpdateParamsInputSchema,
    body: {
      content: {
        'application/json': {
          schema: campanyUpdateBodyInputSchema,
        },
      },
    },
  },
  responses: {
    200: {
      description: 'Campany',
    },
  },
};

export async function campanyUpdateController(
  params: unknown,
  body: unknown,
  context: AppContext,
) {
  const { currentTenant } = validateHasPermission(
    permissions.campanyUpdate,
    context,
  );

  const { id } = campanyUpdateParamsInputSchema.parse(params);

  const data = campanyUpdateBodyInputSchema.parse(body);

  const prisma = prismaAuth(context);



  await prisma.campany.update({
    where: {
      id_tenantId: {
        id,
        tenantId: currentTenant.id,
      },
    },
    data: {
      name: data.name,
      logo: data.logo,
      urlSiteOfficiel: data.urlSiteOfficiel,
      adresse: data.adresse,
      government: data.government,
    },
  });

  let campany = await prisma.campany.findUniqueOrThrow({
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
