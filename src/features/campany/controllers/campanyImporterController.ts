import { RouteConfig } from '@asteasolutions/zod-to-openapi';
import { campanyCreate } from 'src/features/campany/controllers/campanyCreateController';
import { campanyImportInputSchema } from 'src/features/campany/campanySchemas';
import { permissions } from 'src/features/permissions';
import { validateHasPermission } from 'src/features/security';
import { prismaAuth } from 'src/prisma';
import { AppContext } from 'src/shared/controller/appContext';
import Error400 from 'src/shared/errors/Error400';
import { importerOutputSchema } from 'src/shared/schemas/importerSchemas';
import { z } from 'zod';

export const campanyImportApiDoc: RouteConfig = {
  method: 'post',
  path: '/api/campany/importer',
  request: {
    body: {
      content: {
        'application/json': {
          schema: z.array(campanyImportInputSchema),
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

export async function campanyImporterController(
  body: unknown,
  context: AppContext,
) {
  validateHasPermission(permissions.campanyImport, context);
  const prisma = await prismaAuth(context);

  const bodyAsArray = Array.isArray(body) ? body : [body];
  const output: z.infer<typeof importerOutputSchema> = [];

  for (let row of bodyAsArray) {
    try {
      const data = campanyImportInputSchema.parse(row);

      const isImportHashExistent = Boolean(
        await prisma.campany.count({
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

      await campanyCreate(row, context);

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
