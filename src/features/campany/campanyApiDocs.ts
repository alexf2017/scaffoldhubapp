import { OpenAPIRegistry } from '@asteasolutions/zod-to-openapi';
import { campanyAutocompleteApiDoc } from 'src/features/campany/controllers/campanyAutocompleteController';
import { campanyCreateApiDoc } from 'src/features/campany/controllers/campanyCreateController';
import { campanyDestroyManyApiDoc } from 'src/features/campany/controllers/campanyDestroyManyController';
import { campanyFindApiDoc } from 'src/features/campany/controllers/campanyFindController';
import { campanyFindManyApiDoc } from 'src/features/campany/controllers/campanyFindManyController';
import { campanyImportApiDoc } from 'src/features/campany/controllers/campanyImporterController';
import { campanyUpdateApiDoc } from 'src/features/campany/controllers/campanyUpdateController';

export function campanyApiDocs(registry: OpenAPIRegistry, security: any) {
  [
    campanyAutocompleteApiDoc,
    campanyCreateApiDoc,
    campanyDestroyManyApiDoc,
    campanyFindApiDoc,
    campanyFindManyApiDoc,
    campanyUpdateApiDoc,
    campanyImportApiDoc,
  ].map((apiDoc) => {
    registry.registerPath({
      ...apiDoc,
      tags: ['Campany'],
      security,
    });
  });
}
