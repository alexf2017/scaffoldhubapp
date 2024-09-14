'use client';

import { livrableImportApiCall } from 'src/features/livrable/livrableApiCalls';
import {
  livrableImportFileSchema,
  livrableImportInputSchema,
} from 'src/features/livrable/livrableSchemas';
import { Importer } from 'src/shared/components/importer/Importer';
import { AppContext } from 'src/shared/controller/appContext';

export function LivrableImporter({ context }: { context: AppContext }) {
  return (
    <Importer
      keys={[
        'title',
        'document',
        'projet',
        'statusname',
      ]}
      labels={context.dictionary.livrable.fields}
      context={context}
      validationSchema={livrableImportInputSchema}
      fileSchema={livrableImportFileSchema}
      importerFn={livrableImportApiCall}
      breadcrumbRoot={[context.dictionary.livrable.list.menu, '/livrable']}
      queryKeyToInvalidate={['livrable']}
    />
  );
}
