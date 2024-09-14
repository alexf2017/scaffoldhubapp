import { RouteConfig } from '@asteasolutions/zod-to-openapi';
import { stepsCreateInputSchema } from 'src/features/steps/stepsSchemas';
import { filePopulateDownloadUrlInTree } from 'src/features/file/fileService';
import { permissions } from 'src/features/permissions';
import { validateHasPermission } from 'src/features/security';
import { prismaAuth } from 'src/prisma';
import { AppContext } from 'src/shared/controller/appContext';


export const stepsCreateApiDoc: RouteConfig = {
  method: 'post',
  path: '/api/steps',
  request: {
    body: {
      content: {
        'application/json': {
          schema: stepsCreateInputSchema,
        },
      },
    },
  },
  responses: {
    200: {
      description: 'Steps',
    },
  },
};

export async function stepsCreateController(
  body: unknown,
  context: AppContext,
) {
  validateHasPermission(permissions.stepsCreate, context);
  return await stepsCreate(body, context);
}

export async function stepsCreate(body: unknown, context: AppContext) {
  const data = stepsCreateInputSchema.parse(body);

  const prisma = prismaAuth(context);



  let steps = await prisma.steps.create({
    data: {
      title: data.title,
      importHash: data.importHash,
    },
    include: {
      workflow: true,
      steps: true,
      createdByMembership: true,
      updatedByMembership: true,
    },
  });

  steps = await filePopulateDownloadUrlInTree(steps);

  return steps;
}
