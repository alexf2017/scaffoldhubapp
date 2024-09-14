import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { CampanyView } from 'src/features/campany/components/CampanyView';
import { campanyPermissions } from 'src/features/campany/campanyPermissions';
import { hasPermission } from 'src/features/security';
import { appContextForReact } from 'src/shared/controller/appContext';
import { getDictionary } from 'src/translation/getDictionary';
import { getLocaleFromCookies } from 'src/translation/getLocaleFromCookies';

export async function generateMetadata() {
  const locale = getLocaleFromCookies(cookies());
  const dictionary = await getDictionary(locale);

  return {
    title: dictionary.campany.view.title,
  };
}

export default async function CampanyViewPage({
  params,
}: {
  params: { id: string };
}) {
  const context = await appContextForReact(cookies());

  if (!hasPermission(campanyPermissions.campanyRead, context)) {
    redirect('/');
  }

  return <CampanyView id={params.id} context={context} />;
}
