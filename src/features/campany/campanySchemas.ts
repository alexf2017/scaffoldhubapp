import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi';
import { Campany, Membership } from '@prisma/client';
import { importerInputSchema } from 'src/shared/schemas/importerSchemas';
import { orderBySchema } from 'src/shared/schemas/orderBySchema';
import { z } from 'zod';
import { fileUploadedSchema } from 'src/features/file/fileSchemas';

extendZodWithOpenApi(z);

export const campanyFindSchema = z.object({
  id: z.string(),
});

export const campanyFilterFormSchema = z
  .object({
    name: z.string(),
    urlSiteOfficiel: z.string(),
    adresse: z.string(),
    government: z.string(),
  })
  .partial();

export const campanyFilterInputSchema = campanyFilterFormSchema
  .merge(
    z.object({

    }),
  )
  .partial();

export const campanyFindManyInputSchema = z.object({
  filter: campanyFilterInputSchema.partial().optional(),
  orderBy: orderBySchema.default({ updatedAt: 'desc' }),
  skip: z.coerce.number().optional(),
  take: z.coerce.number().optional(),
});

export const campanyDestroyManyInputSchema = z.object({
  ids: z.array(z.string()),
});

export const campanyAutocompleteInputSchema = z.object({
  search: z.string().trim().optional(),
  exclude: z.array(z.string().uuid()).optional(),
  take: z.coerce.number().optional(),
  orderBy: orderBySchema.default({ id: 'asc' }),
});

export const campanyAutocompleteOutputSchema = z.object({
  id: z.string(),
});

export const campanyCreateInputSchema = z.object({
  name: z.string().trim().nullable().optional(),
  logo: z.array(fileUploadedSchema).optional(),
  urlSiteOfficiel: z.string().trim().nullable().optional(),
  adresse: z.string().trim().nullable().optional(),
  government: z.string().trim().nullable().optional(),
  importHash: z.string().optional(),
});

export const campanyImportInputSchema =
  campanyCreateInputSchema.merge(importerInputSchema);

export const campanyImportFileSchema = z
  .object({
    name: z.string(),
    logo: z.string().transform((val) => val?.split(' ')?.filter(Boolean) || []),
    urlSiteOfficiel: z.string(),
    adresse: z.string(),
    government: z.string(),
  })
  .partial();

export const campanyUpdateParamsInputSchema = z.object({
  id: z.string(),
});

export const campanyUpdateBodyInputSchema =
  campanyCreateInputSchema.partial();

export interface CampanyWithRelationships extends Campany {

  createdByMembership?: Membership;
  updatedByMembership?: Membership;
}
