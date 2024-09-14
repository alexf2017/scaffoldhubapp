import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { StatusView } from 'src/features/status/components/StatusView';
import { statusPermissions } from 'src/features/status/statusPermissions';
import { hasPermission } from 'src/features/security';
import { appContextForReact } from 'src/shared/controller/appContext';
import { getDictionary } from 'src/translation/getDictionary';
import { getLocaleFromCookies } from 'src/translation/getLocaleFromCookies';

export async function generateMetadata() {
  const locale = getLocaleFromCookies(cookies());
  const dictionary = await getDictionary(locale);

  return {
    title: dictionary.status.view.title,
  };
}

export default async function StatusViewPage({
  params,
}: {
  params: { id: string };
}) {
  const context = await appContextForReact(cookies());

  if (!hasPermission(statusPermissions.statusRead, context)) {
    redirect('/');
  }

  return <StatusView id={params.id} context={context} />;
}
