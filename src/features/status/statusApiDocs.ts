import { OpenAPIRegistry } from '@asteasolutions/zod-to-openapi';
import { statusAutocompleteApiDoc } from 'src/features/status/controllers/statusAutocompleteController';
import { statusCreateApiDoc } from 'src/features/status/controllers/statusCreateController';
import { statusDestroyManyApiDoc } from 'src/features/status/controllers/statusDestroyManyController';
import { statusFindApiDoc } from 'src/features/status/controllers/statusFindController';
import { statusFindManyApiDoc } from 'src/features/status/controllers/statusFindManyController';
import { statusImportApiDoc } from 'src/features/status/controllers/statusImporterController';
import { statusUpdateApiDoc } from 'src/features/status/controllers/statusUpdateController';

export function statusApiDocs(registry: OpenAPIRegistry, security: any) {
  [
    statusAutocompleteApiDoc,
    statusCreateApiDoc,
    statusDestroyManyApiDoc,
    statusFindApiDoc,
    statusFindManyApiDoc,
    statusUpdateApiDoc,
    statusImportApiDoc,
  ].map((apiDoc) => {
    registry.registerPath({
      ...apiDoc,
      tags: ['Status'],
      security,
    });
  });
}
