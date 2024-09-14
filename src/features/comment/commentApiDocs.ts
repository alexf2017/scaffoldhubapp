import { OpenAPIRegistry } from '@asteasolutions/zod-to-openapi';
import { commentAutocompleteApiDoc } from 'src/features/comment/controllers/commentAutocompleteController';
import { commentCreateApiDoc } from 'src/features/comment/controllers/commentCreateController';
import { commentDestroyManyApiDoc } from 'src/features/comment/controllers/commentDestroyManyController';
import { commentFindApiDoc } from 'src/features/comment/controllers/commentFindController';
import { commentFindManyApiDoc } from 'src/features/comment/controllers/commentFindManyController';
import { commentImportApiDoc } from 'src/features/comment/controllers/commentImporterController';
import { commentUpdateApiDoc } from 'src/features/comment/controllers/commentUpdateController';

export function commentApiDocs(registry: OpenAPIRegistry, security: any) {
  [
    commentAutocompleteApiDoc,
    commentCreateApiDoc,
    commentDestroyManyApiDoc,
    commentFindApiDoc,
    commentFindManyApiDoc,
    commentUpdateApiDoc,
    commentImportApiDoc,
  ].map((apiDoc) => {
    registry.registerPath({
      ...apiDoc,
      tags: ['Comment'],
      security,
    });
  });
}
