import { OpenAPIRegistry } from '@asteasolutions/zod-to-openapi';
import { stepsAutocompleteApiDoc } from 'src/features/steps/controllers/stepsAutocompleteController';
import { stepsCreateApiDoc } from 'src/features/steps/controllers/stepsCreateController';
import { stepsDestroyManyApiDoc } from 'src/features/steps/controllers/stepsDestroyManyController';
import { stepsFindApiDoc } from 'src/features/steps/controllers/stepsFindController';
import { stepsFindManyApiDoc } from 'src/features/steps/controllers/stepsFindManyController';
import { stepsImportApiDoc } from 'src/features/steps/controllers/stepsImporterController';
import { stepsUpdateApiDoc } from 'src/features/steps/controllers/stepsUpdateController';

export function stepsApiDocs(registry: OpenAPIRegistry, security: any) {
  [
    stepsAutocompleteApiDoc,
    stepsCreateApiDoc,
    stepsDestroyManyApiDoc,
    stepsFindApiDoc,
    stepsFindManyApiDoc,
    stepsUpdateApiDoc,
    stepsImportApiDoc,
  ].map((apiDoc) => {
    registry.registerPath({
      ...apiDoc,
      tags: ['Steps'],
      security,
    });
  });
}
