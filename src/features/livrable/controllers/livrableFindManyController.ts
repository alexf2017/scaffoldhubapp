import { RouteConfig } from '@asteasolutions/zod-to-openapi';
import { Prisma } from '@prisma/client';
import dayjs from 'dayjs';
import { livrableFindManyInputSchema } from 'src/features/livrable/livrableSchemas';
import { permissions } from 'src/features/permissions';
import { validateHasPermission } from 'src/features/security';
import { prismaAuth } from 'src/prisma';
import { AppContext } from 'src/shared/controller/appContext';
import { filePopulateDownloadUrlInTree } from 'src/features/file/fileService';

export const livrableFindManyApiDoc: RouteConfig = {
  method: 'get',
  path: '/api/livrable',
  request: {
    query: livrableFindManyInputSchema,
  },
  responses: {
    200: {
      description: '{ livrables: Livrable[], count: number }',
    },
  },
};

export async function livrableFindManyController(
  query: unknown,
  context: AppContext,
) {
  const { currentTenant } = validateHasPermission(
    permissions.livrableRead,
    context,
  );

  const { filter, orderBy, skip, take } =
    livrableFindManyInputSchema.parse(query);

  const whereAnd: Array<Prisma.LivrableWhereInput> = [];

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

  if (filter?.statusname != null) {
    whereAnd.push({
      statusname: {
        id: filter.statusname,
      },
    });
  }

  const prisma = prismaAuth(context);

  let livrables = await prisma.livrable.findMany({
    where: {
      AND: whereAnd,
    },
    skip,
    take,
    orderBy,
    include: {
      statusname: true,
    }
  });

  const count = await prisma.livrable.count({
    where: {
      AND: whereAnd,
    },
  });

  livrables = await filePopulateDownloadUrlInTree(livrables);

  return { livrables, count };
}
