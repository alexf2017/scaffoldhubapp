import { RouteConfig } from '@asteasolutions/zod-to-openapi';
import { Prisma } from '@prisma/client';
import {
  workflowAutocompleteInputSchema,
  workflowAutocompleteOutputSchema,
} from 'src/features/workflow/workflowSchemas';
import { permissions } from 'src/features/permissions';
import { validateHasPermission } from 'src/features/security';
import { prismaAuth } from 'src/prisma';
import { AppContext } from 'src/shared/controller/appContext';
import { z } from 'zod';

export const workflowAutocompleteApiDoc: RouteConfig = {
  method: 'get',
  path: '/api/workflow/autocomplete',
  request: {
    query: workflowAutocompleteInputSchema,
  },
  responses: {
    200: {
      description: 'OK',
      content: {
        'application/json': {
          schema: z.array(workflowAutocompleteOutputSchema),
        },
      },
    },
  },
};

export async function workflowAutocompleteController(
  query: unknown,
  context: AppContext,
) {
  const { currentTenant } = validateHasPermission(
    permissions.workflowAutocomplete,
    context,
  );

  const { search, exclude, take, orderBy } =
    workflowAutocompleteInputSchema.parse(query);

  const prisma = prismaAuth(context);

  const whereAnd: Array<Prisma.WorkflowWhereInput> = [];

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
      title: {
        contains: search,
        mode: 'insensitive',
      },
    });
  }

  let workflows = await prisma.workflow.findMany({
    where: {
      AND: whereAnd,
    },
    take,
    orderBy,
  });

  return workflows.map((workflow) => {
    return {
      id: workflow.id,
    title: String(workflow.title),
    };
  });
}
