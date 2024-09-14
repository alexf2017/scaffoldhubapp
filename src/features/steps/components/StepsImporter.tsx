'use client';

import { stepsImportApiCall } from 'src/features/steps/stepsApiCalls';
import {
  stepsImportFileSchema,
  stepsImportInputSchema,
} from 'src/features/steps/stepsSchemas';
import { Importer } from 'src/shared/components/importer/Importer';
import { AppContext } from 'src/shared/controller/appContext';

export function StepsImporter({ context }: { context: AppContext }) {
  return (
    <Importer
      keys={[
        'title',
      ]}
      labels={context.dictionary.steps.fields}
      context={context}
      validationSchema={stepsImportInputSchema}
      fileSchema={stepsImportFileSchema}
      importerFn={stepsImportApiCall}
      breadcrumbRoot={[context.dictionary.steps.list.menu, '/steps']}
      queryKeyToInvalidate={['steps']}
    />
  );
}
