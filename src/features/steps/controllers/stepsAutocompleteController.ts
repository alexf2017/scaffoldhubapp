import { RouteConfig } from '@asteasolutions/zod-to-openapi';
import { Prisma } from '@prisma/client';
import {
  stepsAutocompleteInputSchema,
  stepsAutocompleteOutputSchema,
} from 'src/features/steps/stepsSchemas';
import { permissions } from 'src/features/permissions';
import { validateHasPermission } from 'src/features/security';
import { prismaAuth } from 'src/prisma';
import { AppContext } from 'src/shared/controller/appContext';
import { z } from 'zod';

export const stepsAutocompleteApiDoc: RouteConfig = {
  method: 'get',
  path: '/api/steps/autocomplete',
  request: {
    query: stepsAutocompleteInputSchema,
  },
  responses: {
    200: {
      description: 'OK',
      content: {
        'application/json': {
          schema: z.array(stepsAutocompleteOutputSchema),
        },
      },
    },
  },
};

export async function stepsAutocompleteController(
  query: unknown,
  context: AppContext,
) {
  const { currentTenant } = validateHasPermission(
    permissions.stepsAutocomplete,
    context,
  );

  const { search, exclude, take, orderBy } =
    stepsAutocompleteInputSchema.parse(query);

  const prisma = prismaAuth(context);

  const whereAnd: Array<Prisma.StepsWhereInput> = [];

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

  let steps = await prisma.steps.findMany({
    where: {
      AND: whereAnd,
    },
    take,
    orderBy,
  });

  return steps.map((steps) => {
    return {
      id: steps.id,
    title: String(steps.title),
    };
  });
}
