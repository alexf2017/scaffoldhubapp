import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi';
import { Livrable, Membership } from '@prisma/client';
import { importerInputSchema } from 'src/shared/schemas/importerSchemas';
import { orderBySchema } from 'src/shared/schemas/orderBySchema';
import { z } from 'zod';
import { fileUploadedSchema } from 'src/features/file/fileSchemas';
import { objectToUuidSchema, objectToUuidSchemaOptional } from 'src/shared/schemas/objectToUuidSchema';
import { Projet } from '@prisma/client';
import { Status } from '@prisma/client';
import { WorkflowStep } from '@prisma/client';

extendZodWithOpenApi(z);

export const livrableFindSchema = z.object({
  id: z.string(),
});

export const livrableFilterFormSchema = z
  .object({
    title: z.string(),
    statusname: z.any(),
  })
  .partial();

export const livrableFilterInputSchema = livrableFilterFormSchema
  .merge(
    z.object({
      statusname: objectToUuidSchemaOptional,
    }),
  )
  .partial();

export const livrableFindManyInputSchema = z.object({
  filter: livrableFilterInputSchema.partial().optional(),
  orderBy: orderBySchema.default({ updatedAt: 'desc' }),
  skip: z.coerce.number().optional(),
  take: z.coerce.number().optional(),
});

export const livrableDestroyManyInputSchema = z.object({
  ids: z.array(z.string()),
});

export const livrableAutocompleteInputSchema = z.object({
  search: z.string().trim().optional(),
  exclude: z.array(z.string().uuid()).optional(),
  take: z.coerce.number().optional(),
  orderBy: orderBySchema.default({ title: 'asc' }),
});

export const livrableAutocompleteOutputSchema = z.object({
  id: z.string(),
  title: z.string(),
});

export const livrableCreateInputSchema = z.object({
  title: z.string().trim(),
  document: z.array(fileUploadedSchema).optional(),
  projet: objectToUuidSchemaOptional,
  statusname: objectToUuidSchema,
  importHash: z.string().optional(),
});

export const livrableImportInputSchema =
  livrableCreateInputSchema.merge(importerInputSchema);

export const livrableImportFileSchema = z
  .object({
    title: z.string(),
    document: z.string().transform((val) => val?.split(' ')?.filter(Boolean) || []),
    projet: z.string(),
    statusname: z.string(),
  })
  .partial();

export const livrableUpdateParamsInputSchema = z.object({
  id: z.string(),
});

export const livrableUpdateBodyInputSchema =
  livrableCreateInputSchema.partial();

export interface LivrableWithRelationships extends Livrable {
  projet?: Projet;
  statusname?: Status;
  wfs?: WorkflowStep[];
  createdByMembership?: Membership;
  updatedByMembership?: Membership;
}
