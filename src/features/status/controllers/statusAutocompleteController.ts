import { RouteConfig } from '@asteasolutions/zod-to-openapi';
import { Prisma } from '@prisma/client';
import {
  statusAutocompleteInputSchema,
  statusAutocompleteOutputSchema,
} from 'src/features/status/statusSchemas';
import { permissions } from 'src/features/permissions';
import { validateHasPermission } from 'src/features/security';
import { prismaAuth } from 'src/prisma';
import { AppContext } from 'src/shared/controller/appContext';
import { z } from 'zod';

export const statusAutocompleteApiDoc: RouteConfig = {
  method: 'get',
  path: '/api/status/autocomplete',
  request: {
    query: statusAutocompleteInputSchema,
  },
  responses: {
    200: {
      description: 'OK',
      content: {
        'application/json': {
          schema: z.array(statusAutocompleteOutputSchema),
        },
      },
    },
  },
};

export async function statusAutocompleteController(
  query: unknown,
  context: AppContext,
) {
  const { currentTenant } = validateHasPermission(
    permissions.statusAutocomplete,
    context,
  );

  const { search, exclude, take, orderBy } =
    statusAutocompleteInputSchema.parse(query);

  const prisma = prismaAuth(context);

  const whereAnd: Array<Prisma.StatusWhereInput> = [];

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
      name: {
        contains: search,
        mode: 'insensitive',
      },
    });
  }

  let status = await prisma.status.findMany({
    where: {
      AND: whereAnd,
    },
    take,
    orderBy,
  });

  return status.map((status) => {
    return {
      id: status.id,
    name: String(status.name),
    };
  });
}
