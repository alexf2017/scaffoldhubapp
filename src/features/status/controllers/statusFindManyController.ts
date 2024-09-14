import { RouteConfig } from '@asteasolutions/zod-to-openapi';
import { Prisma } from '@prisma/client';
import dayjs from 'dayjs';
import { statusFindManyInputSchema } from 'src/features/status/statusSchemas';
import { permissions } from 'src/features/permissions';
import { validateHasPermission } from 'src/features/security';
import { prismaAuth } from 'src/prisma';
import { AppContext } from 'src/shared/controller/appContext';
import { filePopulateDownloadUrlInTree } from 'src/features/file/fileService';

export const statusFindManyApiDoc: RouteConfig = {
  method: 'get',
  path: '/api/status',
  request: {
    query: statusFindManyInputSchema,
  },
  responses: {
    200: {
      description: '{ status: Status[], count: number }',
    },
  },
};

export async function statusFindManyController(
  query: unknown,
  context: AppContext,
) {
  const { currentTenant } = validateHasPermission(
    permissions.statusRead,
    context,
  );

  const { filter, orderBy, skip, take } =
    statusFindManyInputSchema.parse(query);

  const whereAnd: Array<Prisma.StatusWhereInput> = [];

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

  const prisma = prismaAuth(context);

  let status = await prisma.status.findMany({
    where: {
      AND: whereAnd,
    },
    skip,
    take,
    orderBy,
  });

  const count = await prisma.status.count({
    where: {
      AND: whereAnd,
    },
  });

  status = await filePopulateDownloadUrlInTree(status);

  return { status, count };
}
