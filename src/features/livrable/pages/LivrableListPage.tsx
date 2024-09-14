import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import LivrableList from 'src/features/livrable/components/LivrableList';
import { livrablePermissions } from 'src/features/livrable/livrablePermissions';
import { hasPermission } from 'src/features/security';
import { appContextForReact } from 'src/shared/controller/appContext';
import { getDictionary } from 'src/translation/getDictionary';
import { getLocaleFromCookies } from 'src/translation/getLocaleFromCookies';

export async function generateMetadata() {
  const locale = getLocaleFromCookies(cookies());
  const dictionary = await getDictionary(locale);

  return {
    title: dictionary.livrable.list.title,
  };
}

export default async function LivrableListPage() {
  const context = await appContextForReact(cookies());

  if (!hasPermission(livrablePermissions.livrableRead, context)) {
    return redirect('/');
  }

  return <LivrableList context={context} />;
}
