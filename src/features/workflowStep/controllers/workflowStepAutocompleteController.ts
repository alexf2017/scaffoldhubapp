import { RouteConfig } from '@asteasolutions/zod-to-openapi';
import { Prisma } from '@prisma/client';
import {
  workflowStepAutocompleteInputSchema,
  workflowStepAutocompleteOutputSchema,
} from 'src/features/workflowStep/workflowStepSchemas';
import { permissions } from 'src/features/permissions';
import { validateHasPermission } from 'src/features/security';
import { prismaAuth } from 'src/prisma';
import { AppContext } from 'src/shared/controller/appContext';
import { z } from 'zod';

export const workflowStepAutocompleteApiDoc: RouteConfig = {
  method: 'get',
  path: '/api/workflow-step/autocomplete',
  request: {
    query: workflowStepAutocompleteInputSchema,
  },
  responses: {
    200: {
      description: 'OK',
      content: {
        'application/json': {
          schema: z.array(workflowStepAutocompleteOutputSchema),
        },
      },
    },
  },
};

export async function workflowStepAutocompleteController(
  query: unknown,
  context: AppContext,
) {
  const { currentTenant } = validateHasPermission(
    permissions.workflowStepAutocomplete,
    context,
  );

  const { search, exclude, take, orderBy } =
    workflowStepAutocompleteInputSchema.parse(query);

  const prisma = prismaAuth(context);

  const whereAnd: Array<Prisma.WorkflowStepWhereInput> = [];

  whereAnd.push({ tenantId: currentTenant.id });

  if (exclude) {
    whereAnd.push({
      id: {
        notIn: exclude,
      },
    });
  }

  if (search) {
    whereAnd.push({
      order: parseInt(search),
    });
  }

  let workflowSteps = await prisma.workflowStep.findMany({
    where: {
      AND: whereAnd,
    },
    take,
    orderBy,
  });

  return workflowSteps.map((workflowStep) => {
    return {
      id: workflowStep.id,
    order: String(workflowStep.order),
    };
  });
}
