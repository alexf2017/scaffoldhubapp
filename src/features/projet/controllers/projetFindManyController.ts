import { RouteConfig } from '@asteasolutions/zod-to-openapi';
import { Prisma } from '@prisma/client';
import dayjs from 'dayjs';
import { projetFindManyInputSchema } from 'src/features/projet/projetSchemas';
import { permissions } from 'src/features/permissions';
import { validateHasPermission } from 'src/features/security';
import { prismaAuth } from 'src/prisma';
import { AppContext } from 'src/shared/controller/appContext';
import { filePopulateDownloadUrlInTree } from 'src/features/file/fileService';

export const projetFindManyApiDoc: RouteConfig = {
  method: 'get',
  path: '/api/projet',
  request: {
    query: projetFindManyInputSchema,
  },
  responses: {
    200: {
      description: '{ projets: Projet[], count: number }',
    },
  },
};

export async function projetFindManyController(
  query: unknown,
  context: AppContext,
) {
  const { currentTenant } = validateHasPermission(
    permissions.projetRead,
    context,
  );

  const { filter, orderBy, skip, take } =
    projetFindManyInputSchema.parse(query);

  const whereAnd: Array<Prisma.ProjetWhereInput> = [];

  whereAnd.push({
    tenant: {
      id: currentTenant.id,
    },
  });

  if (filter?.title != null) {
    whereAnd.push({
      title: { contains: filter?.title, mode: 'insensitive' },
    });
  }

  if (filter?.isDone != null) {
    whereAnd.push({
      isDone: filter.isDone,
    });
  }

  const prisma = prismaAuth(context);

  let projets = await prisma.projet.findMany({
    where: {
      AND: whereAnd,
    },
    skip,
    take,
    orderBy,
  });

  const count = await prisma.projet.count({
    where: {
      AND: whereAnd,
    },
  });

  projets = await filePopulateDownloadUrlInTree(projets);

  return { projets, count };
}
