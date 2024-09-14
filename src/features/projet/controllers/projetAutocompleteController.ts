import { RouteConfig } from '@asteasolutions/zod-to-openapi';
import { Prisma } from '@prisma/client';
import {
  projetAutocompleteInputSchema,
  projetAutocompleteOutputSchema,
} from 'src/features/projet/projetSchemas';
import { permissions } from 'src/features/permissions';
import { validateHasPermission } from 'src/features/security';
import { prismaAuth } from 'src/prisma';
import { AppContext } from 'src/shared/controller/appContext';
import { z } from 'zod';

export const projetAutocompleteApiDoc: RouteConfig = {
  method: 'get',
  path: '/api/projet/autocomplete',
  request: {
    query: projetAutocompleteInputSchema,
  },
  responses: {
    200: {
      description: 'OK',
      content: {
        'application/json': {
          schema: z.array(projetAutocompleteOutputSchema),
        },
      },
    },
  },
};

export async function projetAutocompleteController(
  query: unknown,
  context: AppContext,
) {
  const { currentTenant } = validateHasPermission(
    permissions.projetAutocomplete,
    context,
  );

  const { search, exclude, take, orderBy } =
    projetAutocompleteInputSchema.parse(query);

  const prisma = prismaAuth(context);

  const whereAnd: Array<Prisma.ProjetWhereInput> = [];

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

  let projets = await prisma.projet.findMany({
    where: {
      AND: whereAnd,
    },
    take,
    orderBy,
  });

  return projets.map((projet) => {
    return {
      id: projet.id,
    title: String(projet.title),
    };
  });
}
