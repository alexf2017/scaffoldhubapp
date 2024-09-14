import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi';
import { Steps, Membership } from '@prisma/client';
import { importerInputSchema } from 'src/shared/schemas/importerSchemas';
import { orderBySchema } from 'src/shared/schemas/orderBySchema';
import { z } from 'zod';
import { objectToUuidSchema, objectToUuidSchemaOptional } from 'src/shared/schemas/objectToUuidSchema';
import { Workflow } from '@prisma/client';
import { WorkflowStep } from '@prisma/client';

extendZodWithOpenApi(z);

export const stepsFindSchema = z.object({
  id: z.string(),
});

export const stepsFilterFormSchema = z
  .object({
    title: z.string(),
  })
  .partial();

export const stepsFilterInputSchema = stepsFilterFormSchema
  .merge(
    z.object({

    }),
  )
  .partial();

export const stepsFindManyInputSchema = z.object({
  filter: stepsFilterInputSchema.partial().optional(),
  orderBy: orderBySchema.default({ updatedAt: 'desc' }),
  skip: z.coerce.number().optional(),
  take: z.coerce.number().optional(),
});

export const stepsDestroyManyInputSchema = z.object({
  ids: z.array(z.string()),
});

export const stepsAutocompleteInputSchema = z.object({
  search: z.string().trim().optional(),
  exclude: z.array(z.string().uuid()).optional(),
  take: z.coerce.number().optional(),
  orderBy: orderBySchema.default({ title: 'asc' }),
});

export const stepsAutocompleteOutputSchema = z.object({
  id: z.string(),
  title: z.string(),
});

export const stepsCreateInputSchema = z.object({
  title: z.string().trim(),
  importHash: z.string().optional(),
});

export const stepsImportInputSchema =
  stepsCreateInputSchema.merge(importerInputSchema);

export const stepsImportFileSchema = z
  .object({
    title: z.string(),
  })
  .partial();

export const stepsUpdateParamsInputSchema = z.object({
  id: z.string(),
});

export const stepsUpdateBodyInputSchema =
  stepsCreateInputSchema.partial();

export interface StepsWithRelationships extends Steps {
  workflow?: Workflow[];
  steps?: WorkflowStep[];
  createdByMembership?: Membership;
  updatedByMembership?: Membership;
}
