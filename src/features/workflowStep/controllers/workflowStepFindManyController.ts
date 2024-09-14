import { RouteConfig } from '@asteasolutions/zod-to-openapi';
import { Prisma } from '@prisma/client';
import dayjs from 'dayjs';
import { workflowStepFindManyInputSchema } from 'src/features/workflowStep/workflowStepSchemas';
import { permissions } from 'src/features/permissions';
import { validateHasPermission } from 'src/features/security';
import { prismaAuth } from 'src/prisma';
import { AppContext } from 'src/shared/controller/appContext';
import { filePopulateDownloadUrlInTree } from 'src/features/file/fileService';

export const workflowStepFindManyApiDoc: RouteConfig = {
  method: 'get',
  path: '/api/workflow-step',
  request: {
    query: workflowStepFindManyInputSchema,
  },
  responses: {
    200: {
      description: '{ workflowSteps: WorkflowStep[], count: number }',
    },
  },
};

export async function workflowStepFindManyController(
  query: unknown,
  context: AppContext,
) {
  const { currentTenant } = validateHasPermission(
    permissions.workflowStepRead,
    context,
  );

  const { filter, orderBy, skip, take } =
    workflowStepFindManyInputSchema.parse(query);

  const whereAnd: Array<Prisma.WorkflowStepWhereInput> = [];

  whereAnd.push({
    tenant: {
      id: currentTenant.id,
    },
  });

  if (filter?.orderRange?.length) {
    const start = filter.orderRange?.[0];
    const end = filter.orderRange?.[1];

    if (start != null) {
      whereAnd.push({
        order: { gte: start },
      });
    }

    if (end != null) {
      whereAnd.push({
        order: { lte: end },
      });
    }
  }

  if (filter?.isDone != null) {
    whereAnd.push({
      isDone: filter.isDone,
    });
  }

  if (filter?.steptitle != null) {
    whereAnd.push({
      steptitle: {
        id: filter.steptitle,
      },
    });
  }

  if (filter?.workFlow != null) {
    whereAnd.push({
      workFlow: {
        id: filter.workFlow,
      },
    });
  }

  if (filter?.observer != null) {
    whereAnd.push({
      observer: {
        id: filter.observer,
      },
    });
  }

  if (filter?.responsible != null) {
    whereAnd.push({
      responsible: {
        id: filter.responsible,
      },
    });
  }

  if (filter?.livrable != null) {
    whereAnd.push({
      livrable: {
        id: filter.livrable,
      },
    });
  }

  const prisma = prismaAuth(context);

  let workflowSteps = await prisma.workflowStep.findMany({
    where: {
      AND: whereAnd,
    },
    skip,
    take,
    orderBy,
    include: {
      steptitle: true,
      workFlow: true,
      observer: true,
      responsible: true,
      livrable: true,
    }
  });

  const count = await prisma.workflowStep.count({
    where: {
      AND: whereAnd,
    },
  });

  workflowSteps = await filePopulateDownloadUrlInTree(workflowSteps);

  return { workflowSteps, count };
}
