import { Status } from '@prisma/client';
import { objectToQuery } from 'src/shared/lib/objectToQuery';
import {
  StatusWithRelationships,
  statusAutocompleteInputSchema,
  statusCreateInputSchema,
  statusFindManyInputSchema,
  statusImportInputSchema,
  statusUpdateBodyInputSchema,
} from 'src/features/status/statusSchemas';
import { ApiErrorPayload } from 'src/shared/errors/ApiErrorPayload';
import { importerOutputSchema } from 'src/shared/schemas/importerSchemas';
import { z } from 'zod';

export async function statusAutocompleteApiCall(
  query?: z.input<typeof statusAutocompleteInputSchema>,
  signal?: AbortSignal,
) {
  const response = await fetch(
    `${
      process.env.NEXT_PUBLIC_BACKEND_URL
    }/api/status/autocomplete?${objectToQuery(query)}`,
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

  return (await response.json()) as Status[];
}

export async function statusFindApiCall(id: string, signal?: AbortSignal) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/status/${id}`,
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

  return (await response.json()) as StatusWithRelationships;
}

export async function statusFindManyApiCall(
  { filter, orderBy, skip, take }: z.input<typeof statusFindManyInputSchema>,
  signal?: AbortSignal,
) {
  const response = await fetch(
    `${
      process.env.NEXT_PUBLIC_BACKEND_URL
    }/api/status?${objectToQuery(
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
    status: Status[];
  };
}

export async function statusCreateApiCall(
  data: z.input<typeof statusCreateInputSchema>,
  signal?: AbortSignal,
) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/status`,
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

  return (await response.json()) as Status;
}

export async function statusImportApiCall(
  data: z.input<typeof statusImportInputSchema>[],
  signal?: AbortSignal,
) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/status/importer`,
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

export async function statusUpdateApiCall(
  id: string,
  data: z.input<typeof statusUpdateBodyInputSchema>,
  signal?: AbortSignal,
) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/status/${id}`,
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

  return (await response.json()) as Status;
}

export async function statusDestroyManyApiCall(
  ids: string[],
  signal?: AbortSignal,
) {
  const response = await fetch(
    `${
      process.env.NEXT_PUBLIC_BACKEND_URL
    }/api/status?${objectToQuery({ ids })}`,
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
