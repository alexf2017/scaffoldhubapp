import { RouteConfig } from '@asteasolutions/zod-to-openapi';
import { workflowStepCreateInputSchema } from 'src/features/workflowStep/workflowStepSchemas';
import { filePopulateDownloadUrlInTree } from 'src/features/file/fileService';
import { permissions } from 'src/features/permissions';
import { validateHasPermission } from 'src/features/security';
import { prismaAuth } from 'src/prisma';
import { AppContext } from 'src/shared/controller/appContext';
import { prismaRelationship } from 'src/prisma/prismaRelationship';

export const workflowStepCreateApiDoc: RouteConfig = {
  method: 'post',
  path: '/api/workflow-step',
  request: {
    body: {
      content: {
        'application/json': {
          schema: workflowStepCreateInputSchema,
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

export async function workflowStepCreateController(
  body: unknown,
  context: AppContext,
) {
  validateHasPermission(permissions.workflowStepCreate, context);
  return await workflowStepCreate(body, context);
}

export async function workflowStepCreate(body: unknown, context: AppContext) {
  const data = workflowStepCreateInputSchema.parse(body);

  const prisma = prismaAuth(context);



  let workflowStep = await prisma.workflowStep.create({
    data: {
      order: data.order,
      isDone: data.isDone,
      steptitle: prismaRelationship.connectOne(data.steptitle),
      workFlow: prismaRelationship.connectOne(data.workFlow),
      observer: prismaRelationship.connectOne(data.observer),
      responsible: prismaRelationship.connectOne(data.responsible),
      livrable: prismaRelationship.connectOne(data.livrable),
      importHash: data.importHash,
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
