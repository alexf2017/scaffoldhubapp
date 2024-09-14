import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi';
import { Status, Membership } from '@prisma/client';
import { importerInputSchema } from 'src/shared/schemas/importerSchemas';
import { orderBySchema } from 'src/shared/schemas/orderBySchema';
import { z } from 'zod';
import { objectToUuidSchema, objectToUuidSchemaOptional } from 'src/shared/schemas/objectToUuidSchema';
import { Livrable } from '@prisma/client';

extendZodWithOpenApi(z);

export const statusFindSchema = z.object({
  id: z.string(),
});

export const statusFilterFormSchema = z
  .object({
    name: z.string(),
  })
  .partial();

export const statusFilterInputSchema = statusFilterFormSchema
  .merge(
    z.object({

    }),
  )
  .partial();

export const statusFindManyInputSchema = z.object({
  filter: statusFilterInputSchema.partial().optional(),
  orderBy: orderBySchema.default({ updatedAt: 'desc' }),
  skip: z.coerce.number().optional(),
  take: z.coerce.number().optional(),
});

export const statusDestroyManyInputSchema = z.object({
  ids: z.array(z.string()),
});

export const statusAutocompleteInputSchema = z.object({
  search: z.string().trim().optional(),
  exclude: z.array(z.string().uuid()).optional(),
  take: z.coerce.number().optional(),
  orderBy: orderBySchema.default({ name: 'asc' }),
});

export const statusAutocompleteOutputSchema = z.object({
  id: z.string(),
  name: z.string(),
});

export const statusCreateInputSchema = z.object({
  name: z.string().trim(),
  importHash: z.string().optional(),
});

export const statusImportInputSchema =
  statusCreateInputSchema.merge(importerInputSchema);

export const statusImportFileSchema = z
  .object({
    name: z.string(),
  })
  .partial();

export const statusUpdateParamsInputSchema = z.object({
  id: z.string(),
});

export const statusUpdateBodyInputSchema =
  statusCreateInputSchema.partial();

export interface StatusWithRelationships extends Status {
  livrble?: Livrable[];
  createdByMembership?: Membership;
  updatedByMembership?: Membership;
}
