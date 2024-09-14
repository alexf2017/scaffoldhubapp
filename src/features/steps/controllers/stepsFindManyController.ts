import { RouteConfig } from '@asteasolutions/zod-to-openapi';
import { Prisma } from '@prisma/client';
import dayjs from 'dayjs';
import { stepsFindManyInputSchema } from 'src/features/steps/stepsSchemas';
import { permissions } from 'src/features/permissions';
import { validateHasPermission } from 'src/features/security';
import { prismaAuth } from 'src/prisma';
import { AppContext } from 'src/shared/controller/appContext';
import { filePopulateDownloadUrlInTree } from 'src/features/file/fileService';

export const stepsFindManyApiDoc: RouteConfig = {
  method: 'get',
  path: '/api/steps',
  request: {
    query: stepsFindManyInputSchema,
  },
  responses: {
    200: {
      description: '{ steps: Steps[], count: number }',
    },
  },
};

export async function stepsFindManyController(
  query: unknown,
  context: AppContext,
) {
  const { currentTenant } = validateHasPermission(
    permissions.stepsRead,
    context,
  );

  const { filter, orderBy, skip, take } =
    stepsFindManyInputSchema.parse(query);

  const whereAnd: Array<Prisma.StepsWhereInput> = [];

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

  const prisma = prismaAuth(context);

  let steps = await prisma.steps.findMany({
    where: {
      AND: whereAnd,
    },
    skip,
    take,
    orderBy,
  });

  const count = await prisma.steps.count({
    where: {
      AND: whereAnd,
    },
  });

  steps = await filePopulateDownloadUrlInTree(steps);

  return { steps, count };
}
