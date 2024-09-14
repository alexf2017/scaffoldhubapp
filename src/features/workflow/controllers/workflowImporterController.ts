import { RouteConfig } from '@asteasolutions/zod-to-openapi';
import { workflowCreate } from 'src/features/workflow/controllers/workflowCreateController';
import { workflowImportInputSchema } from 'src/features/workflow/workflowSchemas';
import { permissions } from 'src/features/permissions';
import { validateHasPermission } from 'src/features/security';
import { prismaAuth } from 'src/prisma';
import { AppContext } from 'src/shared/controller/appContext';
import Error400 from 'src/shared/errors/Error400';
import { importerOutputSchema } from 'src/shared/schemas/importerSchemas';
import { z } from 'zod';

export const workflowImportApiDoc: RouteConfig = {
  method: 'post',
  path: '/api/workflow/importer',
  request: {
    body: {
      content: {
        'application/json': {
          schema: z.array(workflowImportInputSchema),
        },
      },
    },
  },
  responses: {
    200: {
      description: 'OK',
      content: {
        'application/json': {
          schema: importerOutputSchema,
        },
      },
    },
  },
};

export async function workflowImporterController(
  body: unknown,
  context: AppContext,
) {
  validateHasPermission(permissions.workflowImport, context);
  const prisma = await prismaAuth(context);

  const bodyAsArray = Array.isArray(body) ? body : [body];
  const output: z.infer<typeof importerOutputSchema> = [];

  for (let row of bodyAsArray) {
    try {
      const data = workflowImportInputSchema.parse(row);

      const isImportHashExistent = Boolean(
        await prisma.workflow.count({
          where: {
            importHash: data.importHash,
          },
        }),
      );

      if (isImportHashExistent) {
        throw new Error400(
          context.dictionary.shared.importer.importHashAlreadyExists,
        );
      }

      await workflowCreate(row, context);

      output.push({
        _status: 'success',
        _line: (row as any)._line,
      });
    } catch (error: any) {
      output.push({
        _status: 'error',
        _line: (row as any)._line,
        _errorMessages: [error.message],
      });
    }
  }

  return output;
}
