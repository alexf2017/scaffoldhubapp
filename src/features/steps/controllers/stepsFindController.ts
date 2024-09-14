import { RouteConfig } from '@asteasolutions/zod-to-openapi';
import { stepsFindSchema } from 'src/features/steps/stepsSchemas';
import { permissions } from 'src/features/permissions';
import { validateHasPermission } from 'src/features/security';
import { prismaAuth } from 'src/prisma';
import { AppContext } from 'src/shared/controller/appContext';
import { filePopulateDownloadUrlInTree } from 'src/features/file/fileService';

export const stepsFindApiDoc: RouteConfig = {
  method: 'get',
  path: '/api/steps/{id}',
  request: {
    params: stepsFindSchema,
  },
  responses: {
    200: {
      description: 'Steps',
    },
  },
};

export async function stepsFindController(
  params: unknown,
  context: AppContext,
) {
  const { currentTenant } = validateHasPermission(
    permissions.stepsRead,
    context,
  );

  const { id } = stepsFindSchema.parse(params);

  const prisma = prismaAuth(context);

  let steps = await prisma.steps.findUnique({
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
