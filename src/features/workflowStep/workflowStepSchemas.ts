import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi';
import { WorkflowStep, Membership } from '@prisma/client';
import { importerInputSchema } from 'src/shared/schemas/importerSchemas';
import { orderBySchema } from 'src/shared/schemas/orderBySchema';
import { z } from 'zod';
import { numberCoerceSchema, numberOptionalCoerceSchema } from 'src/shared/schemas/numberCoerceSchema';
import { objectToUuidSchema, objectToUuidSchemaOptional } from 'src/shared/schemas/objectToUuidSchema';
import { Steps } from '@prisma/client';
import { Workflow } from '@prisma/client';
import { Livrable } from '@prisma/client';
import { Comment } from '@prisma/client';

extendZodWithOpenApi(z);

export const workflowStepFindSchema = z.object({
  id: z.string(),
});

export const workflowStepFilterFormSchema = z
  .object({
    orderRange: z.array(z.coerce.number()).max(2),
    isDone: z.string().nullable().optional(),
    steptitle: z.any(),
    workFlow: z.any(),
    observer: z.any(),
    responsible: z.any(),
    livrable: z.any(),
  })
  .partial();

export const workflowStepFilterInputSchema = workflowStepFilterFormSchema
  .merge(
    z.object({
      isDone: z.string().optional().nullable().transform((val) => val != null && val !== '' ? val === 'true' : null),
      steptitle: objectToUuidSchemaOptional,
      workFlow: objectToUuidSchemaOptional,
      observer: objectToUuidSchemaOptional,
      responsible: objectToUuidSchemaOptional,
      livrable: objectToUuidSchemaOptional,
    }),
  )
  .partial();

export const workflowStepFindManyInputSchema = z.object({
  filter: workflowStepFilterInputSchema.partial().optional(),
  orderBy: orderBySchema.default({ updatedAt: 'desc' }),
  skip: z.coerce.number().optional(),
  take: z.coerce.number().optional(),
});

export const workflowStepDestroyManyInputSchema = z.object({
  ids: z.array(z.string()),
});

export const workflowStepAutocompleteInputSchema = z.object({
  search: z.string().trim().optional(),
  exclude: z.array(z.string().uuid()).optional(),
  take: z.coerce.number().optional(),
  orderBy: orderBySchema.default({ order: 'asc' }),
});

export const workflowStepAutocompleteOutputSchema = z.object({
  id: z.string(),
  order: z.string(),
});

export const workflowStepCreateInputSchema = z.object({
  order: numberCoerceSchema(z.number().int()),
  isDone: z.boolean().default(false),
  steptitle: objectToUuidSchemaOptional,
  workFlow: objectToUuidSchemaOptional,
  observer: objectToUuidSchemaOptional,
  responsible: objectToUuidSchemaOptional,
  livrable: objectToUuidSchemaOptional,
  importHash: z.string().optional(),
});

export const workflowStepImportInputSchema =
  workflowStepCreateInputSchema.merge(importerInputSchema);

export const workflowStepImportFileSchema = z
  .object({
    order: z.string(),
    isDone: z.string().transform((val) => val === 'true' || val === 'TRUE'),
    steptitle: z.string(),
    workFlow: z.string(),
    observer: z.string(),
    responsible: z.string(),
    livrable: z.string(),
  })
  .partial();

export const workflowStepUpdateParamsInputSchema = z.object({
  id: z.string(),
});

export const workflowStepUpdateBodyInputSchema =
  workflowStepCreateInputSchema.partial();

export interface WorkflowStepWithRelationships extends WorkflowStep {
  steptitle?: Steps;
  workFlow?: Workflow;
  observer?: Membership;
  responsible?: Membership;
  livrable?: Livrable;
  cmt?: Comment[];
  createdByMembership?: Membership;
  updatedByMembership?: Membership;
}
