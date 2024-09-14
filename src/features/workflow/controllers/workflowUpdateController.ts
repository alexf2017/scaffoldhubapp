import { RouteConfig } from '@asteasolutions/zod-to-openapi';
import {
  workflowUpdateBodyInputSchema,
  workflowUpdateParamsInputSchema,
} from 'src/features/workflow/workflowSchemas';
import { filePopulateDownloadUrlInTree } from 'src/features/file/fileService';
import { permissions } from 'src/features/permissions';
import { validateHasPermission } from 'src/features/security';
import { prismaAuth } from 'src/prisma';
import { AppContext } from 'src/shared/controller/appContext';
import { prismaRelationship } from 'src/prisma/prismaRelationship';

export const workflowUpdateApiDoc: RouteConfig = {
  method: 'put',
  path: '/api/workflow/{id}',
  request: {
    params: workflowUpdateParamsInputSchema,
    body: {
      content: {
        'application/json': {
          schema: workflowUpdateBodyInputSchema,
        },
      },
    },
  },
  responses: {
    200: {
      description: 'Workflow',
    },
  },
};

export async function workflowUpdateController(
  params: unknown,
  body: unknown,
  context: AppContext,
) {
  const { currentTenant } = validateHasPermission(
    permissions.workflowUpdate,
    context,
  );

  const { id } = workflowUpdateParamsInputSchema.parse(params);

  const data = workflowUpdateBodyInputSchema.parse(body);

  const prisma = prismaAuth(context);



  await prisma.workflow.update({
    where: {
      id_tenantId: {
        id,
        tenantId: currentTenant.id,
      },
    },
    data: {
      title: data.title,
      steps: prismaRelationship.setMany(data.steps),
    },
  });

  let workflow = await prisma.workflow.findUniqueOrThrow({
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
