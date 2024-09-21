import { RouteConfig } from '@asteasolutions/zod-to-openapi';
import { Prisma } from '@prisma/client';
import dayjs from 'dayjs';
import { projetFindManyInputSchema } from 'src/features/projet/projetSchemas';
import { permissions } from 'src/features/permissions';
import { validateHasPermission } from 'src/features/security';
import { prismaAuth } from 'src/prisma';
import { AppContext } from 'src/shared/controller/appContext';
import { filePopulateDownloadUrlInTree } from 'src/features/file/fileService';

export const projetFindManyApiDoc: RouteConfig = {
  method: 'get',
  path: '/api/projet',
  request: {
    query: projetFindManyInputSchema,
  },
  responses: {
    200: {
      description: '{ projets: Projet[], count: number }',
    },
  },
};

export async function projetFindManyController(
  query: unknown,
  context: AppContext,
) {
  const { currentTenant } = validateHasPermission(
    permissions.projetRead,
    context,
  );

  const currentUserId = context.currentMembership?.id;
  const currentUserRole = context.currentMembership?.roles[0]; // Assuming 'admin' or 'employer' as roles

  const { filter, orderBy, skip, take } =
    projetFindManyInputSchema.parse(query);

  const whereAnd: Array<Prisma.ProjetWhereInput> = [];

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

  if (filter?.isDone != null) {
    whereAnd.push({
      isDone: filter.isDone,
    });
  }

  if (currentUserRole === 'employer') {
    // Employer can only see projects where they are either observer or responsible in any livrable
    whereAnd.push({
      livrable: {
        some: {
          wfs: {
            some: {
              OR: [
                { observerId: currentUserId },
                { responsibleId: currentUserId },
              ],
            },
          },
        },
      },
    });
    console.log('Employer user - fetching restricted projects');
  }

  const prisma = prismaAuth(context);

  // Apply the filtering logic in the findMany call
  let projets = await prisma.projet.findMany({
    skip,
    take,
    orderBy,
    where: {
      AND: whereAnd, // Apply the filter conditions here
    },
    include: {
      livrable: {
        include: {
          wfs: true,
        },
      },
    },
  });

  const count = await prisma.projet.count({
    where: {
      AND: whereAnd,
    },
  });

  projets = await filePopulateDownloadUrlInTree(projets);

  return { projets, count };
}
