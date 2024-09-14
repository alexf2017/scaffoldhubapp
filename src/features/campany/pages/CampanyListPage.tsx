import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import CampanyList from 'src/features/campany/components/CampanyList';
import { campanyPermissions } from 'src/features/campany/campanyPermissions';
import { hasPermission } from 'src/features/security';
import { appContextForReact } from 'src/shared/controller/appContext';
import { getDictionary } from 'src/translation/getDictionary';
import { getLocaleFromCookies } from 'src/translation/getLocaleFromCookies';

export async function generateMetadata() {
  const locale = getLocaleFromCookies(cookies());
  const dictionary = await getDictionary(locale);

  return {
    title: dictionary.campany.list.title,
  };
}

export default async function CampanyListPage() {
  const context = await appContextForReact(cookies());

  if (!hasPermission(campanyPermissions.campanyRead, context)) {
    return redirect('/');
  }

  return <CampanyList context={context} />;
}
