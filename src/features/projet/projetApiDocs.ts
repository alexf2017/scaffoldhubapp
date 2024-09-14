import { OpenAPIRegistry } from '@asteasolutions/zod-to-openapi';
import { projetAutocompleteApiDoc } from 'src/features/projet/controllers/projetAutocompleteController';
import { projetCreateApiDoc } from 'src/features/projet/controllers/projetCreateController';
import { projetDestroyManyApiDoc } from 'src/features/projet/controllers/projetDestroyManyController';
import { projetFindApiDoc } from 'src/features/projet/controllers/projetFindController';
import { projetFindManyApiDoc } from 'src/features/projet/controllers/projetFindManyController';
import { projetImportApiDoc } from 'src/features/projet/controllers/projetImporterController';
import { projetUpdateApiDoc } from 'src/features/projet/controllers/projetUpdateController';

export function projetApiDocs(registry: OpenAPIRegistry, security: any) {
  [
    projetAutocompleteApiDoc,
    projetCreateApiDoc,
    projetDestroyManyApiDoc,
    projetFindApiDoc,
    projetFindManyApiDoc,
    projetUpdateApiDoc,
    projetImportApiDoc,
  ].map((apiDoc) => {
    registry.registerPath({
      ...apiDoc,
      tags: ['Projet'],
      security,
    });
  });
}
