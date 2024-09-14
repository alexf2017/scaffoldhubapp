import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi';
import { Comment, Membership } from '@prisma/client';
import { importerInputSchema } from 'src/shared/schemas/importerSchemas';
import { orderBySchema } from 'src/shared/schemas/orderBySchema';
import { z } from 'zod';
import { objectToUuidSchema, objectToUuidSchemaOptional } from 'src/shared/schemas/objectToUuidSchema';
import { WorkflowStep } from '@prisma/client';

extendZodWithOpenApi(z);

export const commentFindSchema = z.object({
  id: z.string(),
});

export const commentFilterFormSchema = z
  .object({
    context: z.string(),
  })
  .partial();

export const commentFilterInputSchema = commentFilterFormSchema
  .merge(
    z.object({

    }),
  )
  .partial();

export const commentFindManyInputSchema = z.object({
  filter: commentFilterInputSchema.partial().optional(),
  orderBy: orderBySchema.default({ updatedAt: 'desc' }),
  skip: z.coerce.number().optional(),
  take: z.coerce.number().optional(),
});

export const commentDestroyManyInputSchema = z.object({
  ids: z.array(z.string()),
});

export const commentAutocompleteInputSchema = z.object({
  search: z.string().trim().optional(),
  exclude: z.array(z.string().uuid()).optional(),
  take: z.coerce.number().optional(),
  orderBy: orderBySchema.default({ id: 'asc' }),
});

export const commentAutocompleteOutputSchema = z.object({
  id: z.string(),
});

export const commentCreateInputSchema = z.object({
  context: z.string().trim().nullable().optional(),
  workflowstepid: objectToUuidSchemaOptional,
  importHash: z.string().optional(),
});

export const commentImportInputSchema =
  commentCreateInputSchema.merge(importerInputSchema);

export const commentImportFileSchema = z
  .object({
    context: z.string(),
    workflowstepid: z.string(),
  })
  .partial();

export const commentUpdateParamsInputSchema = z.object({
  id: z.string(),
});

export const commentUpdateBodyInputSchema =
  commentCreateInputSchema.partial();

export interface CommentWithRelationships extends Comment {
  workflowstepid?: WorkflowStep;
  createdByMembership?: Membership;
  updatedByMembership?: Membership;
}
