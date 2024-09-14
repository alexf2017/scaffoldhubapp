import { RouteConfig } from '@asteasolutions/zod-to-openapi';
import { Prisma } from '@prisma/client';
import dayjs from 'dayjs';
import { campanyFindManyInputSchema } from 'src/features/campany/campanySchemas';
import { permissions } from 'src/features/permissions';
import { validateHasPermission } from 'src/features/security';
import { prismaAuth } from 'src/prisma';
import { AppContext } from 'src/shared/controller/appContext';
import { filePopulateDownloadUrlInTree } from 'src/features/file/fileService';

export const campanyFindManyApiDoc: RouteConfig = {
  method: 'get',
  path: '/api/campany',
  request: {
    query: campanyFindManyInputSchema,
  },
  responses: {
    200: {
      description: '{ campanies: Campany[], count: number }',
    },
  },
};

export async function campanyFindManyController(
  query: unknown,
  context: AppContext,
) {
  const { currentTenant } = validateHasPermission(
    permissions.campanyRead,
    context,
  );

  const { filter, orderBy, skip, take } =
    campanyFindManyInputSchema.parse(query);

  const whereAnd: Array<Prisma.CampanyWhereInput> = [];

  whereAnd.push({
    tenant: {
      id: currentTenant.id,
    },
  });

  if (filter?.name != null) {
    whereAnd.push({
      name: { contains: filter?.name, mode: 'insensitive' },
    });
  }

  if (filter?.urlSiteOfficiel != null) {
    whereAnd.push({
      urlSiteOfficiel: { contains: filter?.urlSiteOfficiel, mode: 'insensitive' },
    });
  }

  if (filter?.adresse != null) {
    whereAnd.push({
      adresse: { contains: filter?.adresse, mode: 'insensitive' },
    });
  }

  if (filter?.government != null) {
    whereAnd.push({
      government: { contains: filter?.government, mode: 'insensitive' },
    });
  }

  const prisma = prismaAuth(context);

  let campanies = await prisma.campany.findMany({
    where: {
      AND: whereAnd,
    },
    skip,
    take,
    orderBy,
  });

  const count = await prisma.campany.count({
    where: {
      AND: whereAnd,
    },
  });

  campanies = await filePopulateDownloadUrlInTree(campanies);

  return { campanies, count };
}
