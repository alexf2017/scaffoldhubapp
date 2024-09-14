import { NextRequest } from 'next/server';
import { queryToObject } from 'src/shared/lib/queryToObject';
import { livrableAutocompleteController } from 'src/features/livrable/controllers/livrableAutocompleteController';
import { NextResponseError } from 'src/shared/controller/NextResponseError';
import { NextResponseSuccess } from 'src/shared/controller/NextResponseSuccess';
import { appContext } from 'src/shared/controller/appContext';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET(request: NextRequest) {
  let context;
  try {
    context = await appContext(request);
    const query = queryToObject(request.nextUrl.search);
    const payload = await livrableAutocompleteController(query, context);
    return NextResponseSuccess(request, context, payload);
  } catch (error: any) {
    return NextResponseError(request, context, error);
  }
}
