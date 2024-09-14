import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi';
import { Workflow, Membership } from '@prisma/client';
import { importerInputSchema } from 'src/shared/schemas/importerSchemas';
import { orderBySchema } from 'src/shared/schemas/orderBySchema';
import { z } from 'zod';
import { objectToUuidSchema, objectToUuidSchemaOptional } from 'src/shared/schemas/objectToUuidSchema';
import { Steps } from '@prisma/client';
import { WorkflowStep } from '@prisma/client';

extendZodWithOpenApi(z);

export const workflowFindSchema = z.object({
  id: z.string(),
});

export const workflowFilterFormSchema = z
  .object({
    title: z.string(),
    steps: z.array(z.any()),
  })
  .partial();

export const workflowFilterInputSchema = workflowFilterFormSchema
  .merge(
    z.object({
      steps: z.array(objectToUuidSchemaOptional),
    }),
  )
  .partial();

export const workflowFindManyInputSchema = z.object({
  filter: workflowFilterInputSchema.partial().optional(),
  orderBy: orderBySchema.default({ updatedAt: 'desc' }),
  skip: z.coerce.number().optional(),
  take: z.coerce.number().optional(),
});

export const workflowDestroyManyInputSchema = z.object({
  ids: z.array(z.string()),
});

export const workflowAutocompleteInputSchema = z.object({
  search: z.string().trim().optional(),
  exclude: z.array(z.string().uuid()).optional(),
  take: z.coerce.number().optional(),
  orderBy: orderBySchema.default({ title: 'asc' }),
});

export const workflowAutocompleteOutputSchema = z.object({
  id: z.string(),
  title: z.string(),
});

export const workflowCreateInputSchema = z.object({
  title: z.string().trim(),
  steps: z.array(objectToUuidSchema).optional(),
  importHash: z.string().optional(),
});

export const workflowImportInputSchema =
  workflowCreateInputSchema.merge(importerInputSchema);

export const workflowImportFileSchema = z
  .object({
    title: z.string(),
    steps: z.string().transform((val) => val.split(' ')),
  })
  .partial();

export const workflowUpdateParamsInputSchema = z.object({
  id: z.string(),
});

export const workflowUpdateBodyInputSchema =
  workflowCreateInputSchema.partial();

export interface WorkflowWithRelationships extends Workflow {
  steps?: Steps[];
  wf?: WorkflowStep[];
  createdByMembership?: Membership;
  updatedByMembership?: Membership;
}
