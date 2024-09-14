import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import CampanyEdit from 'src/features/campany/components/CampanyEdit';
import { permissions } from 'src/features/permissions';
import { hasPermission } from 'src/features/security';
import { appContextForReact } from 'src/shared/controller/appContext';
import { getDictionary } from 'src/translation/getDictionary';
import { getLocaleFromCookies } from 'src/translation/getLocaleFromCookies';

export async function generateMetadata() {
  const locale = getLocaleFromCookies(cookies());
  const dictionary = await getDictionary(locale);

  return {
    title: dictionary.campany.edit.title,
  };
}

export default async function CampanyEditPage({
  params,
}: {
  params: { id: string };
}) {
  const context = await appContextForReact(cookies());

  if (!hasPermission(permissions.campanyUpdate, context)) {
    return redirect('/');
  }

  return <CampanyEdit context={context} id={params.id} />;
}
