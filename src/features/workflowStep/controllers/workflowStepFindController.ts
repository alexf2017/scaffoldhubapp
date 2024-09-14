import { RouteConfig } from '@asteasolutions/zod-to-openapi';
import { workflowStepFindSchema } from 'src/features/workflowStep/workflowStepSchemas';
import { permissions } from 'src/features/permissions';
import { validateHasPermission } from 'src/features/security';
import { prismaAuth } from 'src/prisma';
import { AppContext } from 'src/shared/controller/appContext';
import { filePopulateDownloadUrlInTree } from 'src/features/file/fileService';

export const workflowStepFindApiDoc: RouteConfig = {
  method: 'get',
  path: '/api/workflow-step/{id}',
  request: {
    params: workflowStepFindSchema,
  },
  responses: {
    200: {
      description: 'WorkflowStep',
    },
  },
};

export async function workflowStepFindController(
  params: unknown,
  context: AppContext,
) {
  const { currentTenant } = validateHasPermission(
    permissions.workflowStepRead,
    context,
  );

  const { id } = workflowStepFindSchema.parse(params);

  const prisma = prismaAuth(context);

  let workflowStep = await prisma.workflowStep.findUnique({
    where: {
      id_tenantId: {
        id,
        tenantId: currentTenant.id,
      },
    },
    include: {
      steptitle: true,
      workFlow: true,
      observer: true,
      responsible: true,
      livrable: true,
      cmt: true,
      createdByMembership: true,
      updatedByMembership: true,
    },
  });

  workflowStep = await filePopulateDownloadUrlInTree(workflowStep);

  return workflowStep;
}
