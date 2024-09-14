import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi';
import { Projet, Membership } from '@prisma/client';
import { importerInputSchema } from 'src/shared/schemas/importerSchemas';
import { orderBySchema } from 'src/shared/schemas/orderBySchema';
import { z } from 'zod';
import { objectToUuidSchema, objectToUuidSchemaOptional } from 'src/shared/schemas/objectToUuidSchema';
import { Livrable } from '@prisma/client';

extendZodWithOpenApi(z);

export const projetFindSchema = z.object({
  id: z.string(),
});

export const projetFilterFormSchema = z
  .object({
    title: z.string(),
    isDone: z.string().nullable().optional(),
  })
  .partial();

export const projetFilterInputSchema = projetFilterFormSchema
  .merge(
    z.object({
      isDone: z.string().optional().nullable().transform((val) => val != null && val !== '' ? val === 'true' : null),
    }),
  )
  .partial();

export const projetFindManyInputSchema = z.object({
  filter: projetFilterInputSchema.partial().optional(),
  orderBy: orderBySchema.default({ updatedAt: 'desc' }),
  skip: z.coerce.number().optional(),
  take: z.coerce.number().optional(),
});

export const projetDestroyManyInputSchema = z.object({
  ids: z.array(z.string()),
});

export const projetAutocompleteInputSchema = z.object({
  search: z.string().trim().optional(),
  exclude: z.array(z.string().uuid()).optional(),
  take: z.coerce.number().optional(),
  orderBy: orderBySchema.default({ title: 'asc' }),
});

export const projetAutocompleteOutputSchema = z.object({
  id: z.string(),
  title: z.string(),
});

export const projetCreateInputSchema = z.object({
  title: z.string().trim(),
  isDone: z.boolean().default(false),
  importHash: z.string().optional(),
});

export const projetImportInputSchema =
  projetCreateInputSchema.merge(importerInputSchema);

export const projetImportFileSchema = z
  .object({
    title: z.string(),
    isDone: z.string().transform((val) => val === 'true' || val === 'TRUE'),
  })
  .partial();

export const projetUpdateParamsInputSchema = z.object({
  id: z.string(),
});

export const projetUpdateBodyInputSchema =
  projetCreateInputSchema.partial();

export interface ProjetWithRelationships extends Projet {
  livrable?: Livrable[];
  createdByMembership?: Membership;
  updatedByMembership?: Membership;
}
