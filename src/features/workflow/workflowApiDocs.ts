import { OpenAPIRegistry } from '@asteasolutions/zod-to-openapi';
import { workflowAutocompleteApiDoc } from 'src/features/workflow/controllers/workflowAutocompleteController';
import { workflowCreateApiDoc } from 'src/features/workflow/controllers/workflowCreateController';
import { workflowDestroyManyApiDoc } from 'src/features/workflow/controllers/workflowDestroyManyController';
import { workflowFindApiDoc } from 'src/features/workflow/controllers/workflowFindController';
import { workflowFindManyApiDoc } from 'src/features/workflow/controllers/workflowFindManyController';
import { workflowImportApiDoc } from 'src/features/workflow/controllers/workflowImporterController';
import { workflowUpdateApiDoc } from 'src/features/workflow/controllers/workflowUpdateController';

export function workflowApiDocs(registry: OpenAPIRegistry, security: any) {
  [
    workflowAutocompleteApiDoc,
    workflowCreateApiDoc,
    workflowDestroyManyApiDoc,
    workflowFindApiDoc,
    workflowFindManyApiDoc,
    workflowUpdateApiDoc,
    workflowImportApiDoc,
  ].map((apiDoc) => {
    registry.registerPath({
      ...apiDoc,
      tags: ['Workflow'],
      security,
    });
  });
}
