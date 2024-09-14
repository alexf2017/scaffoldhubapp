import { OpenAPIRegistry } from '@asteasolutions/zod-to-openapi';
import { workflowStepAutocompleteApiDoc } from 'src/features/workflowStep/controllers/workflowStepAutocompleteController';
import { workflowStepCreateApiDoc } from 'src/features/workflowStep/controllers/workflowStepCreateController';
import { workflowStepDestroyManyApiDoc } from 'src/features/workflowStep/controllers/workflowStepDestroyManyController';
import { workflowStepFindApiDoc } from 'src/features/workflowStep/controllers/workflowStepFindController';
import { workflowStepFindManyApiDoc } from 'src/features/workflowStep/controllers/workflowStepFindManyController';
import { workflowStepImportApiDoc } from 'src/features/workflowStep/controllers/workflowStepImporterController';
import { workflowStepUpdateApiDoc } from 'src/features/workflowStep/controllers/workflowStepUpdateController';

export function workflowStepApiDocs(registry: OpenAPIRegistry, security: any) {
  [
    workflowStepAutocompleteApiDoc,
    workflowStepCreateApiDoc,
    workflowStepDestroyManyApiDoc,
    workflowStepFindApiDoc,
    workflowStepFindManyApiDoc,
    workflowStepUpdateApiDoc,
    workflowStepImportApiDoc,
  ].map((apiDoc) => {
    registry.registerPath({
      ...apiDoc,
      tags: ['WorkflowStep'],
      security,
    });
  });
}
