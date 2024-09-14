import { RouteConfig } from '@asteasolutions/zod-to-openapi';
import { Prisma } from '@prisma/client';
import dayjs from 'dayjs';
import { commentFindManyInputSchema } from 'src/features/comment/commentSchemas';
import { permissions } from 'src/features/permissions';
import { validateHasPermission } from 'src/features/security';
import { prismaAuth } from 'src/prisma';
import { AppContext } from 'src/shared/controller/appContext';
import { filePopulateDownloadUrlInTree } from 'src/features/file/fileService';

export const commentFindManyApiDoc: RouteConfig = {
  method: 'get',
  path: '/api/comment',
  request: {
    query: commentFindManyInputSchema,
  },
  responses: {
    200: {
      description: '{ comments: Comment[], count: number }',
    },
  },
};

export async function commentFindManyController(
  query: unknown,
  context: AppContext,
) {
  const { currentTenant } = validateHasPermission(
    permissions.commentRead,
    context,
  );

  const { filter, orderBy, skip, take } =
    commentFindManyInputSchema.parse(query);

  const whereAnd: Array<Prisma.CommentWhereInput> = [];

  whereAnd.push({
    tenant: {
      id: currentTenant.id,
    },
  });

  if (filter?.context != null) {
    whereAnd.push({
      context: { contains: filter?.context, mode: 'insensitive' },
    });
  }

  const prisma = prismaAuth(context);

  let comments = await prisma.comment.findMany({
    where: {
      AND: whereAnd,
    },
    skip,
    take,
    orderBy,
  });

  const count = await prisma.comment.count({
    where: {
      AND: whereAnd,
    },
  });

  comments = await filePopulateDownloadUrlInTree(comments);

  return { comments, count };
}
