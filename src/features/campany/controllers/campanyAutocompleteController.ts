import { RouteConfig } from '@asteasolutions/zod-to-openapi';
import { Prisma } from '@prisma/client';
import {
  campanyAutocompleteInputSchema,
  campanyAutocompleteOutputSchema,
} from 'src/features/campany/campanySchemas';
import { permissions } from 'src/features/permissions';
import { validateHasPermission } from 'src/features/security';
import { prismaAuth } from 'src/prisma';
import { AppContext } from 'src/shared/controller/appContext';
import { z } from 'zod';

export const campanyAutocompleteApiDoc: RouteConfig = {
  method: 'get',
  path: '/api/campany/autocomplete',
  request: {
    query: campanyAutocompleteInputSchema,
  },
  responses: {
    200: {
      description: 'OK',
      content: {
        'application/json': {
          schema: z.array(campanyAutocompleteOutputSchema),
        },
      },
    },
  },
};

export async function campanyAutocompleteController(
  query: unknown,
  context: AppContext,
) {
  const { currentTenant } = validateHasPermission(
    permissions.campanyAutocomplete,
    context,
  );

  const { search, exclude, take, orderBy } =
    campanyAutocompleteInputSchema.parse(query);

  const prisma = prismaAuth(context);

  const whereAnd: Array<Prisma.CampanyWhereInput> = [];

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
      id: search,
    });
  }

  let campanies = await prisma.campany.findMany({
    where: {
      AND: whereAnd,
    },
    take,
    orderBy,
  });

  return campanies.map((campany) => {
    return {
      id: campany.id,
    };
  });
}
