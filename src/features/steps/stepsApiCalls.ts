import { Steps } from '@prisma/client';
import { objectToQuery } from 'src/shared/lib/objectToQuery';
import {
  StepsWithRelationships,
  stepsAutocompleteInputSchema,
  stepsCreateInputSchema,
  stepsFindManyInputSchema,
  stepsImportInputSchema,
  stepsUpdateBodyInputSchema,
} from 'src/features/steps/stepsSchemas';
import { ApiErrorPayload } from 'src/shared/errors/ApiErrorPayload';
import { importerOutputSchema } from 'src/shared/schemas/importerSchemas';
import { z } from 'zod';

export async function stepsAutocompleteApiCall(
  query?: z.input<typeof stepsAutocompleteInputSchema>,
  signal?: AbortSignal,
) {
  const response = await fetch(
    `${
      process.env.NEXT_PUBLIC_BACKEND_URL
    }/api/steps/autocomplete?${objectToQuery(query)}`,
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

  return (await response.json()) as Steps[];
}

export async function stepsFindApiCall(id: string, signal?: AbortSignal) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/steps/${id}`,
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

  return (await response.json()) as StepsWithRelationships;
}

export async function stepsFindManyApiCall(
  { filter, orderBy, skip, take }: z.input<typeof stepsFindManyInputSchema>,
  signal?: AbortSignal,
) {
  const response = await fetch(
    `${
      process.env.NEXT_PUBLIC_BACKEND_URL
    }/api/steps?${objectToQuery(
      {
        filter,
        orderBy,
        skip,
        take,
      },
    )}`,
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
    steps: Steps[];
  };
}

export async function stepsCreateApiCall(
  data: z.input<typeof stepsCreateInputSchema>,
  signal?: AbortSignal,
) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/steps`,
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

  return (await response.json()) as Steps;
}

export async function stepsImportApiCall(
  data: z.input<typeof stepsImportInputSchema>[],
  signal?: AbortSignal,
) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/steps/importer`,
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

export async function stepsUpdateApiCall(
  id: string,
  data: z.input<typeof stepsUpdateBodyInputSchema>,
  signal?: AbortSignal,
) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/steps/${id}`,
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

  return (await response.json()) as Steps;
}

export async function stepsDestroyManyApiCall(
  ids: string[],
  signal?: AbortSignal,
) {
  const response = await fetch(
    `${
      process.env.NEXT_PUBLIC_BACKEND_URL
    }/api/steps?${objectToQuery({ ids })}`,
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
