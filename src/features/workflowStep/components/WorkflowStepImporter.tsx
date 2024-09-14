'use client';

import { workflowStepImportApiCall } from 'src/features/workflowStep/workflowStepApiCalls';
import {
  workflowStepImportFileSchema,
  workflowStepImportInputSchema,
} from 'src/features/workflowStep/workflowStepSchemas';
import { Importer } from 'src/shared/components/importer/Importer';
import { AppContext } from 'src/shared/controller/appContext';

export function WorkflowStepImporter({ context }: { context: AppContext }) {
  return (
    <Importer
      keys={[
        'order',
        'responsible',
        'observer',
        'livrable',
        'steptitle',
        'workFlow',
        'isDone',
      ]}
      labels={context.dictionary.workflowStep.fields}
      context={context}
      validationSchema={workflowStepImportInputSchema}
      fileSchema={workflowStepImportFileSchema}
      importerFn={workflowStepImportApiCall}
      breadcrumbRoot={[context.dictionary.workflowStep.list.menu, '/workflow-step']}
      queryKeyToInvalidate={['workflowStep']}
    />
  );
}
