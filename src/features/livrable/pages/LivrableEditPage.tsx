import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import LivrableEdit from 'src/features/livrable/components/LivrableEdit';
import { permissions } from 'src/features/permissions';
import { hasPermission } from 'src/features/security';
import { appContextForReact } from 'src/shared/controller/appContext';
import { getDictionary } from 'src/translation/getDictionary';
import { getLocaleFromCookies } from 'src/translation/getLocaleFromCookies';

export async function generateMetadata() {
  const locale = getLocaleFromCookies(cookies());
  const dictionary = await getDictionary(locale);

  return {
    title: dictionary.livrable.edit.title,
  };
}

export default async function LivrableEditPage({
  params,
}: {
  params: { id: string };
}) {
  const context = await appContextForReact(cookies());

  if (!hasPermission(permissions.livrableUpdate, context)) {
    return redirect('/');
  }

  return <LivrableEdit context={context} id={params.id} />;
}
