import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import StatusList from 'src/features/status/components/StatusList';
import { statusPermissions } from 'src/features/status/statusPermissions';
import { hasPermission } from 'src/features/security';
import { appContextForReact } from 'src/shared/controller/appContext';
import { getDictionary } from 'src/translation/getDictionary';
import { getLocaleFromCookies } from 'src/translation/getLocaleFromCookies';

export async function generateMetadata() {
  const locale = getLocaleFromCookies(cookies());
  const dictionary = await getDictionary(locale);

  return {
    title: dictionary.status.list.title,
  };
}

export default async function StatusListPage() {
  const context = await appContextForReact(cookies());

  if (!hasPermission(statusPermissions.statusRead, context)) {
    return redirect('/');
  }

  return <StatusList context={context} />;
}
