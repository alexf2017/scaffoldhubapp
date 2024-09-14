'use client';

import { statusImportApiCall } from 'src/features/status/statusApiCalls';
import {
  statusImportFileSchema,
  statusImportInputSchema,
} from 'src/features/status/statusSchemas';
import { Importer } from 'src/shared/components/importer/Importer';
import { AppContext } from 'src/shared/controller/appContext';

export function StatusImporter({ context }: { context: AppContext }) {
  return (
    <Importer
      keys={[
        'name',
      ]}
      labels={context.dictionary.status.fields}
      context={context}
      validationSchema={statusImportInputSchema}
      fileSchema={statusImportFileSchema}
      importerFn={statusImportApiCall}
      breadcrumbRoot={[context.dictionary.status.list.menu, '/status']}
      queryKeyToInvalidate={['status']}
    />
  );
}
