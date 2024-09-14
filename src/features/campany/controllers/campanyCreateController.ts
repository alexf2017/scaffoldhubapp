import { RouteConfig } from '@asteasolutions/zod-to-openapi';
import { campanyCreateInputSchema } from 'src/features/campany/campanySchemas';
import { filePopulateDownloadUrlInTree } from 'src/features/file/fileService';
import { permissions } from 'src/features/permissions';
import { validateHasPermission } from 'src/features/security';
import { prismaAuth } from 'src/prisma';
import { AppContext } from 'src/shared/controller/appContext';


export const campanyCreateApiDoc: RouteConfig = {
  method: 'post',
  path: '/api/campany',
  request: {
    body: {
      content: {
        'application/json': {
          schema: campanyCreateInputSchema,
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

export async function campanyCreateController(
  body: unknown,
  context: AppContext,
) {
  validateHasPermission(permissions.campanyCreate, context);
  return await campanyCreate(body, context);
}

export async function campanyCreate(body: unknown, context: AppContext) {
  const data = campanyCreateInputSchema.parse(body);

  const prisma = prismaAuth(context);



  let campany = await prisma.campany.create({
    data: {
      name: data.name,
      logo: data.logo,
      urlSiteOfficiel: data.urlSiteOfficiel,
      adresse: data.adresse,
      government: data.government,
      importHash: data.importHash,
    },
    include: {

      createdByMembership: true,
      updatedByMembership: true,
    },
  });

  campany = await filePopulateDownloadUrlInTree(campany);

  return campany;
}
