import { WorkflowStep } from '@prisma/client';
import { objectToQuery } from 'src/shared/lib/objectToQuery';
import {
  WorkflowStepWithRelationships,
  workflowStepAutocompleteInputSchema,
  workflowStepCreateInputSchema,
  workflowStepFindManyInputSchema,
  workflowStepImportInputSchema,
  workflowStepUpdateBodyInputSchema,
} from 'src/features/workflowStep/workflowStepSchemas';
import { ApiErrorPayload } from 'src/shared/errors/ApiErrorPayload';
import { importerOutputSchema } from 'src/shared/schemas/importerSchemas';
import { z } from 'zod';

import axios from 'axios';
export async function workflowStepAutocompleteApiCall(
  query?: z.input<typeof workflowStepAutocompleteInputSchema>,
  signal?: AbortSignal,
) {
  const response = await fetch(
    `${
      process.env.NEXT_PUBLIC_BACKEND_URL
    }/api/workflow-step/autocomplete?${objectToQuery(query)}`,
    {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
      signal,
    },
  );

  if (!response.ok) {
    const payload = (await response.json()) as ApiErrorPayload;
    throw new Error(payload.errors?.[0]?.message);
  }

  return (await response.json()) as WorkflowStep[];
}

export async function workflowStepFindApiCall(
  id: string,
  signal?: AbortSignal,
) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/workflow-step/${id}`,
    {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
      signal,
    },
  );

  if (!response.ok) {
    const payload = (await response.json()) as ApiErrorPayload;
    throw new Error(payload.errors?.[0]?.message);
  }

  return (await response.json()) as WorkflowStepWithRelationships;
}

export async function workflowStepFindManyApiCall(
  {
    filter,
    orderBy,
    skip,
    take,
  }: z.input<typeof workflowStepFindManyInputSchema>,
  signal?: AbortSignal,
) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/workflow-step?${objectToQuery({
      filter,
      orderBy,
      skip,
      take,
    })}`,
    {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
      signal,
    },
  );
  // const getCurrentUser = () => {
  //   axios
  //     .get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/me`)
  //     .then((res) => {
  //       return res.data;
  //     });
  // };

  // console.log('HHHHHHHHHHH', getCurrentUser());
  if (!response.ok) {
    const payload = (await response.json()) as ApiErrorPayload;
    throw new Error(payload.errors?.[0]?.message);
  }

  return (await response.json()) as {
    count: number;
    workflowSteps: WorkflowStep[];
  };
}

export async function workflowStepCurrentUserFindManyApiCall(
  {
    filter,
    orderBy,
    skip,
    take,
  }: z.input<typeof workflowStepFindManyInputSchema>,
  signal?: AbortSignal,
) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/workflow-step?${objectToQuery({
      filter,
      orderBy,
      skip,
      take,
    })}`,
    {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
      signal,
    },
  );

  if (!response.ok) {
    const payload = (await response.json()) as ApiErrorPayload;
    throw new Error(payload.errors?.[0]?.message);
  }

  return (await response.json()) as {
    count: number;
    workflowSteps: WorkflowStep[];
  };
}
export async function workflowStepCreateApiCall(
  data: z.input<typeof workflowStepCreateInputSchema>,
  signal?: AbortSignal,
) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/workflow-step`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
      signal,
    },
  );

  if (!response.ok) {
    const payload = (await response.json()) as ApiErrorPayload;
    throw new Error(payload.errors?.[0]?.message);
  }

  return (await response.json()) as WorkflowStep;
}

export async function workflowStepImportApiCall(
  data: z.input<typeof workflowStepImportInputSchema>[],
  signal?: AbortSignal,
) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/workflow-step/importer`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
      signal,
    },
  );

  if (!response.ok) {
    const payload = (await response.json()) as ApiErrorPayload;
    throw new Error(payload.errors?.[0]?.message);
  }

  return (await response.json()) as z.infer<typeof importerOutputSchema>;
}

export async function workflowStepUpdateApiCall(
  id: string,
  data: z.input<typeof workflowStepUpdateBodyInputSchema>,
  signal?: AbortSignal,
) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/workflow-step/${id}`,
    {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
      signal,
    },
  );

  if (!response.ok) {
    const payload = (await response.json()) as ApiErrorPayload;
    throw new Error(payload.errors?.[0]?.message);
  }

  return (await response.json()) as WorkflowStep;
}

export async function workflowStepDestroyManyApiCall(
  ids: string[],
  signal?: AbortSignal,
) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/workflow-step?${objectToQuery({
      ids,
    })}`,
    {
      method: 'DELETE',
      signal,
    },
  );

  if (!response.ok) {
    const payload = (await response.json()) as ApiErrorPayload;
    throw new Error(payload.errors?.[0]?.message);
  }
}
