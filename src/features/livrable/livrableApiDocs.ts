import { OpenAPIRegistry } from '@asteasolutions/zod-to-openapi';
import { livrableAutocompleteApiDoc } from 'src/features/livrable/controllers/livrableAutocompleteController';
import { livrableCreateApiDoc } from 'src/features/livrable/controllers/livrableCreateController';
import { livrableDestroyManyApiDoc } from 'src/features/livrable/controllers/livrableDestroyManyController';
import { livrableFindApiDoc } from 'src/features/livrable/controllers/livrableFindController';
import { livrableFindManyApiDoc } from 'src/features/livrable/controllers/livrableFindManyController';
import { livrableImportApiDoc } from 'src/features/livrable/controllers/livrableImporterController';
import { livrableUpdateApiDoc } from 'src/features/livrable/controllers/livrableUpdateController';

export function livrableApiDocs(registry: OpenAPIRegistry, security: any) {
  [
    livrableAutocompleteApiDoc,
    livrableCreateApiDoc,
    livrableDestroyManyApiDoc,
    livrableFindApiDoc,
    livrableFindManyApiDoc,
    livrableUpdateApiDoc,
    livrableImportApiDoc,
  ].map((apiDoc) => {
    registry.registerPath({
      ...apiDoc,
      tags: ['Livrable'],
      security,
    });
  });
}
