import { Livrable } from '@prisma/client';
import { objectToQuery } from 'src/shared/lib/objectToQuery';
import {
  LivrableWithRelationships,
  livrableAutocompleteInputSchema,
  livrableCreateInputSchema,
  livrableFindManyInputSchema,
  livrableImportInputSchema,
  livrableUpdateBodyInputSchema,
} from 'src/features/livrable/livrableSchemas';
import { ApiErrorPayload } from 'src/shared/errors/ApiErrorPayload';
import { importerOutputSchema } from 'src/shared/schemas/importerSchemas';
import { z } from 'zod';

export async function livrableAutocompleteApiCall(
  query?: z.input<typeof livrableAutocompleteInputSchema>,
  signal?: AbortSignal,
) {
  const response = await fetch(
    `${
      process.env.NEXT_PUBLIC_BACKEND_URL
    }/api/livrable/autocomplete?${objectToQuery(query)}`,
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

  return (await response.json()) as Livrable[];
}

export async function livrableFindApiCall(id: string, signal?: AbortSignal) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/livrable/${id}`,
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

  return (await response.json()) as LivrableWithRelationships;
}

export async function livrableFindManyApiCall(
  { filter, orderBy, skip, take }: z.input<typeof livrableFindManyInputSchema>,
  signal?: AbortSignal,
) {
  const response = await fetch(
    `${
      process.env.NEXT_PUBLIC_BACKEND_URL
    }/api/livrable?${objectToQuery(
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
    livrables: Livrable[];
  };
}

export async function livrableCreateApiCall(
  data: z.input<typeof livrableCreateInputSchema>,
  signal?: AbortSignal,
) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/livrable`,
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

  return (await response.json()) as Livrable;
}

export async function livrableImportApiCall(
  data: z.input<typeof livrableImportInputSchema>[],
  signal?: AbortSignal,
) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/livrable/importer`,
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

export async function livrableUpdateApiCall(
  id: string,
  data: z.input<typeof livrableUpdateBodyInputSchema>,
  signal?: AbortSignal,
) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/livrable/${id}`,
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

  return (await response.json()) as Livrable;
}

export async function livrableDestroyManyApiCall(
  ids: string[],
  signal?: AbortSignal,
) {
  const response = await fetch(
    `${
      process.env.NEXT_PUBLIC_BACKEND_URL
    }/api/livrable?${objectToQuery({ ids })}`,
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
