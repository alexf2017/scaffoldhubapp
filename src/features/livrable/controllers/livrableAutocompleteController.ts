import { RouteConfig } from '@asteasolutions/zod-to-openapi';
import { Prisma } from '@prisma/client';
import {
  livrableAutocompleteInputSchema,
  livrableAutocompleteOutputSchema,
} from 'src/features/livrable/livrableSchemas';
import { permissions } from 'src/features/permissions';
import { validateHasPermission } from 'src/features/security';
import { prismaAuth } from 'src/prisma';
import { AppContext } from 'src/shared/controller/appContext';
import { z } from 'zod';

export const livrableAutocompleteApiDoc: RouteConfig = {
  method: 'get',
  path: '/api/livrable/autocomplete',
  request: {
    query: livrableAutocompleteInputSchema,
  },
  responses: {
    200: {
      description: 'OK',
      content: {
        'application/json': {
          schema: z.array(livrableAutocompleteOutputSchema),
        },
      },
    },
  },
};

export async function livrableAutocompleteController(
  query: unknown,
  context: AppContext,
) {
  const { currentTenant } = validateHasPermission(
    permissions.livrableAutocomplete,
    context,
  );

  const { search, exclude, take, orderBy } =
    livrableAutocompleteInputSchema.parse(query);

  const prisma = prismaAuth(context);

  const whereAnd: Array<Prisma.LivrableWhereInput> = [];

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

  let livrables = await prisma.livrable.findMany({
    where: {
      AND: whereAnd,
    },
    take,
    orderBy,
  });

  return livrables.map((livrable) => {
    return {
      id: livrable.id,
    title: String(livrable.title),
    };
  });
}
