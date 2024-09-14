import { RouteConfig } from '@asteasolutions/zod-to-openapi';
import { Prisma } from '@prisma/client';
import dayjs from 'dayjs';
import { workflowFindManyInputSchema } from 'src/features/workflow/workflowSchemas';
import { permissions } from 'src/features/permissions';
import { validateHasPermission } from 'src/features/security';
import { prismaAuth } from 'src/prisma';
import { AppContext } from 'src/shared/controller/appContext';
import { filePopulateDownloadUrlInTree } from 'src/features/file/fileService';

export const workflowFindManyApiDoc: RouteConfig = {
  method: 'get',
  path: '/api/workflow',
  request: {
    query: workflowFindManyInputSchema,
  },
  responses: {
    200: {
      description: '{ workflows: Workflow[], count: number }',
    },
  },
};

export async function workflowFindManyController(
  query: unknown,
  context: AppContext,
) {
  const { currentTenant } = validateHasPermission(
    permissions.workflowRead,
    context,
  );

  const { filter, orderBy, skip, take } =
    workflowFindManyInputSchema.parse(query);

  const whereAnd: Array<Prisma.WorkflowWhereInput> = [];

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

  if (filter?.steps?.length) {
    whereAnd.push({
      steps: {
        some: {
          id: {
            in: filter.steps.filter(Boolean),
          },
        },
      },
    });
  }

  const prisma = prismaAuth(context);

  let workflows = await prisma.workflow.findMany({
    where: {
      AND: whereAnd,
    },
    skip,
    take,
    orderBy,
    include: {
      steps: true,
    }
  });

  const count = await prisma.workflow.count({
    where: {
      AND: whereAnd,
    },
  });

  workflows = await filePopulateDownloadUrlInTree(workflows);

  return { workflows, count };
}
