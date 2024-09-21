import { Projet } from '@prisma/client';
import { objectToQuery } from 'src/shared/lib/objectToQuery';
import {
  ProjetWithRelationships,
  projetAutocompleteInputSchema,
  projetCreateInputSchema,
  projetFindManyInputSchema,
  projetImportInputSchema,
  projetUpdateBodyInputSchema,
} from 'src/features/projet/projetSchemas';
import { ApiErrorPayload } from 'src/shared/errors/ApiErrorPayload';
import { importerOutputSchema } from 'src/shared/schemas/importerSchemas';
import { z } from 'zod';

export async function projetAutocompleteApiCall(
  query?: z.input<typeof projetAutocompleteInputSchema>,
  signal?: AbortSignal,
) {
  const response = await fetch(
    `${
      process.env.NEXT_PUBLIC_BACKEND_URL
    }/api/projet/autocomplete?${objectToQuery(query)}`,
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

  return (await response.json()) as Projet[];
}

export async function projetFindApiCall(id: string, signal?: AbortSignal) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/projet/${id}`,
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

  return (await response.json()) as ProjetWithRelationships;
}

export async function projetFindManyApiCall(
  { filter, orderBy, skip, take }: z.input<typeof projetFindManyInputSchema>,
  signal?: AbortSignal,
) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/projet?${objectToQuery({
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
    projets: Projet[];
  };
}

export async function projetCreateApiCall(
  data: z.input<typeof projetCreateInputSchema>,
  signal?: AbortSignal,
) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/projet`,
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

  return (await response.json()) as Projet;
}

export async function projetImportApiCall(
  data: z.input<typeof projetImportInputSchema>[],
  signal?: AbortSignal,
) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/projet/importer`,
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

export async function projetUpdateApiCall(
  id: string,
  data: z.input<typeof projetUpdateBodyInputSchema>,
  signal?: AbortSignal,
) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/projet/${id}`,
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

  return (await response.json()) as Projet;
}

export async function projetDestroyManyApiCall(
  ids: string[],
  signal?: AbortSignal,
) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/projet?${objectToQuery({
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
