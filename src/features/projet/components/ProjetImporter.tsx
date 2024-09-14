'use client';

import { projetImportApiCall } from 'src/features/projet/projetApiCalls';
import {
  projetImportFileSchema,
  projetImportInputSchema,
} from 'src/features/projet/projetSchemas';
import { Importer } from 'src/shared/components/importer/Importer';
import { AppContext } from 'src/shared/controller/appContext';

export function ProjetImporter({ context }: { context: AppContext }) {
  return (
    <Importer
      keys={[
        'title',
        'isDone',
      ]}
      labels={context.dictionary.projet.fields}
      context={context}
      validationSchema={projetImportInputSchema}
      fileSchema={projetImportFileSchema}
      importerFn={projetImportApiCall}
      breadcrumbRoot={[context.dictionary.projet.list.menu, '/projet']}
      queryKeyToInvalidate={['projet']}
    />
  );
}
