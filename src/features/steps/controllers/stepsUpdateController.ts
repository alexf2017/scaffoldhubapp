import { RouteConfig } from '@asteasolutions/zod-to-openapi';
import {
  stepsUpdateBodyInputSchema,
  stepsUpdateParamsInputSchema,
} from 'src/features/steps/stepsSchemas';
import { filePopulateDownloadUrlInTree } from 'src/features/file/fileService';
import { permissions } from 'src/features/permissions';
import { validateHasPermission } from 'src/features/security';
import { prismaAuth } from 'src/prisma';
import { AppContext } from 'src/shared/controller/appContext';


export const stepsUpdateApiDoc: RouteConfig = {
  method: 'put',
  path: '/api/steps/{id}',
  request: {
    params: stepsUpdateParamsInputSchema,
    body: {
      content: {
        'application/json': {
          schema: stepsUpdateBodyInputSchema,
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

export async function stepsUpdateController(
  params: unknown,
  body: unknown,
  context: AppContext,
) {
  const { currentTenant } = validateHasPermission(
    permissions.stepsUpdate,
    context,
  );

  const { id } = stepsUpdateParamsInputSchema.parse(params);

  const data = stepsUpdateBodyInputSchema.parse(body);

  const prisma = prismaAuth(context);



  await prisma.steps.update({
    where: {
      id_tenantId: {
        id,
        tenantId: currentTenant.id,
      },
    },
    data: {
      title: data.title,
    },
  });

  let steps = await prisma.steps.findUniqueOrThrow({
    where: {
      id_tenantId: {
        id,
        tenantId: currentTenant.id,
      },
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
