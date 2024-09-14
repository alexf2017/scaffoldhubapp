'use client';

import { campanyImportApiCall } from 'src/features/campany/campanyApiCalls';
import {
  campanyImportFileSchema,
  campanyImportInputSchema,
} from 'src/features/campany/campanySchemas';
import { Importer } from 'src/shared/components/importer/Importer';
import { AppContext } from 'src/shared/controller/appContext';

export function CampanyImporter({ context }: { context: AppContext }) {
  return (
    <Importer
      keys={[
        'name',
        'logo',
        'urlSiteOfficiel',
        'adresse',
        'government',
      ]}
      labels={context.dictionary.campany.fields}
      context={context}
      validationSchema={campanyImportInputSchema}
      fileSchema={campanyImportFileSchema}
      importerFn={campanyImportApiCall}
      breadcrumbRoot={[context.dictionary.campany.list.menu, '/campany']}
      queryKeyToInvalidate={['campany']}
    />
  );
}
