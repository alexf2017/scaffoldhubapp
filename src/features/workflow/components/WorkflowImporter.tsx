'use client';

import { workflowImportApiCall } from 'src/features/workflow/workflowApiCalls';
import {
  workflowImportFileSchema,
  workflowImportInputSchema,
} from 'src/features/workflow/workflowSchemas';
import { Importer } from 'src/shared/components/importer/Importer';
import { AppContext } from 'src/shared/controller/appContext';

export function WorkflowImporter({ context }: { context: AppContext }) {
  return (
    <Importer
      keys={[
        'title',
        'steps',
      ]}
      labels={context.dictionary.workflow.fields}
      context={context}
      validationSchema={workflowImportInputSchema}
      fileSchema={workflowImportFileSchema}
      importerFn={workflowImportApiCall}
      breadcrumbRoot={[context.dictionary.workflow.list.menu, '/workflow']}
      queryKeyToInvalidate={['workflow']}
    />
  );
}
