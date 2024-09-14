import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import StatusEdit from 'src/features/status/components/StatusEdit';
import { permissions } from 'src/features/permissions';
import { hasPermission } from 'src/features/security';
import { appContextForReact } from 'src/shared/controller/appContext';
import { getDictionary } from 'src/translation/getDictionary';
import { getLocaleFromCookies } from 'src/translation/getLocaleFromCookies';

export async function generateMetadata() {
  const locale = getLocaleFromCookies(cookies());
  const dictionary = await getDictionary(locale);

  return {
    title: dictionary.status.edit.title,
  };
}

export default async function StatusEditPage({
  params,
}: {
  params: { id: string };
}) {
  const context = await appContextForReact(cookies());

  if (!hasPermission(permissions.statusUpdate, context)) {
    return redirect('/');
  }

  return <StatusEdit context={context} id={params.id} />;
}
