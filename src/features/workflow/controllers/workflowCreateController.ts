import { RouteConfig } from '@asteasolutions/zod-to-openapi';
import { workflowCreateInputSchema } from 'src/features/workflow/workflowSchemas';
import { filePopulateDownloadUrlInTree } from 'src/features/file/fileService';
import { permissions } from 'src/features/permissions';
import { validateHasPermission } from 'src/features/security';
import { prismaAuth } from 'src/prisma';
import { AppContext } from 'src/shared/controller/appContext';
import { prismaRelationship } from 'src/prisma/prismaRelationship';

export const workflowCreateApiDoc: RouteConfig = {
  method: 'post',
  path: '/api/workflow',
  request: {
    body: {
      content: {
        'application/json': {
          schema: workflowCreateInputSchema,
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

export async function workflowCreateController(
  body: unknown,
  context: AppContext,
) {
  validateHasPermission(permissions.workflowCreate, context);
  return await workflowCreate(body, context);
}

export async function workflowCreate(body: unknown, context: AppContext) {
  const data = workflowCreateInputSchema.parse(body);

  const prisma = prismaAuth(context);



  let workflow = await prisma.workflow.create({
    data: {
      title: data.title,
      steps: prismaRelationship.connectMany(data.steps),
      importHash: data.importHash,
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
