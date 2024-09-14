import { RouteConfig } from '@asteasolutions/zod-to-openapi';
import {
  workflowStepUpdateBodyInputSchema,
  workflowStepUpdateParamsInputSchema,
} from 'src/features/workflowStep/workflowStepSchemas';
import { filePopulateDownloadUrlInTree } from 'src/features/file/fileService';
import { permissions } from 'src/features/permissions';
import { validateHasPermission } from 'src/features/security';
import { prismaAuth } from 'src/prisma';
import { AppContext } from 'src/shared/controller/appContext';
import { prismaRelationship } from 'src/prisma/prismaRelationship';

export const workflowStepUpdateApiDoc: RouteConfig = {
  method: 'put',
  path: '/api/workflowStep/{id}',
  request: {
    params: workflowStepUpdateParamsInputSchema,
    body: {
      content: {
        'application/json': {
          schema: workflowStepUpdateBodyInputSchema,
        },
      },
    },
  },
  responses: {
    200: {
      description: 'WorkflowStep',
    },
  },
};

export async function workflowStepUpdateController(
  params: unknown,
  body: unknown,
  context: AppContext,
) {
  const { currentTenant } = validateHasPermission(
    permissions.workflowStepUpdate,
    context,
  );

  const { id } = workflowStepUpdateParamsInputSchema.parse(params);

  const data = workflowStepUpdateBodyInputSchema.parse(body);

  const prisma = prismaAuth(context);



  await prisma.workflowStep.update({
    where: {
      id_tenantId: {
        id,
        tenantId: currentTenant.id,
      },
    },
    data: {
      order: data.order,
      isDone: data.isDone,
      steptitle: prismaRelationship.connectOrDisconnectOne(data.steptitle),
      workFlow: prismaRelationship.connectOrDisconnectOne(data.workFlow),
      observer: prismaRelationship.connectOrDisconnectOne(data.observer),
      responsible: prismaRelationship.connectOrDisconnectOne(data.responsible),
      livrable: prismaRelationship.connectOrDisconnectOne(data.livrable),
    },
  });

  let workflowStep = await prisma.workflowStep.findUniqueOrThrow({
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
