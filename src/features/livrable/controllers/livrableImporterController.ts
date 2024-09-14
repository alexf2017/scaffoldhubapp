import { RouteConfig } from '@asteasolutions/zod-to-openapi';
import { livrableCreate } from 'src/features/livrable/controllers/livrableCreateController';
import { livrableImportInputSchema } from 'src/features/livrable/livrableSchemas';
import { permissions } from 'src/features/permissions';
import { validateHasPermission } from 'src/features/security';
import { prismaAuth } from 'src/prisma';
import { AppContext } from 'src/shared/controller/appContext';
import Error400 from 'src/shared/errors/Error400';
import { importerOutputSchema } from 'src/shared/schemas/importerSchemas';
import { z } from 'zod';

export const livrableImportApiDoc: RouteConfig = {
  method: 'post',
  path: '/api/livrable/importer',
  request: {
    body: {
      content: {
        'application/json': {
          schema: z.array(livrableImportInputSchema),
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

export async function livrableImporterController(
  body: unknown,
  context: AppContext,
) {
  validateHasPermission(permissions.livrableImport, context);
  const prisma = await prismaAuth(context);

  const bodyAsArray = Array.isArray(body) ? body : [body];
  const output: z.infer<typeof importerOutputSchema> = [];

  for (let row of bodyAsArray) {
    try {
      const data = livrableImportInputSchema.parse(row);

      const isImportHashExistent = Boolean(
        await prisma.livrable.count({
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

      await livrableCreate(row, context);

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
