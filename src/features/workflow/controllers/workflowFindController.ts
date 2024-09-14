import { RouteConfig } from '@asteasolutions/zod-to-openapi';
import { workflowFindSchema } from 'src/features/workflow/workflowSchemas';
import { permissions } from 'src/features/permissions';
import { validateHasPermission } from 'src/features/security';
import { prismaAuth } from 'src/prisma';
import { AppContext } from 'src/shared/controller/appContext';
import { filePopulateDownloadUrlInTree } from 'src/features/file/fileService';

export const workflowFindApiDoc: RouteConfig = {
  method: 'get',
  path: '/api/workflow/{id}',
  request: {
    params: workflowFindSchema,
  },
  responses: {
    200: {
      description: 'Workflow',
    },
  },
};

export async function workflowFindController(
  params: unknown,
  context: AppContext,
) {
  const { currentTenant } = validateHasPermission(
    permissions.workflowRead,
    context,
  );

  const { id } = workflowFindSchema.parse(params);

  const prisma = prismaAuth(context);

  let workflow = await prisma.workflow.findUnique({
    where: {
      id_tenantId: {
        id,
        tenantId: currentTenant.id,
      },
    },
    include: {
      steps: true,
      wf: true,
      createdByMembership: true,
      updatedByMembership: true,
    },
  });

  workflow = await filePopulateDownloadUrlInTree(workflow);

  return workflow;
}
