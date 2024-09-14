import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { LivrableView } from 'src/features/livrable/components/LivrableView';
import { livrablePermissions } from 'src/features/livrable/livrablePermissions';
import { hasPermission } from 'src/features/security';
import { appContextForReact } from 'src/shared/controller/appContext';
import { getDictionary } from 'src/translation/getDictionary';
import { getLocaleFromCookies } from 'src/translation/getLocaleFromCookies';

export async function generateMetadata() {
  const locale = getLocaleFromCookies(cookies());
  const dictionary = await getDictionary(locale);

  return {
    title: dictionary.livrable.view.title,
  };
}

export default async function LivrableViewPage({
  params,
}: {
  params: { id: string };
}) {
  const context = await appContextForReact(cookies());

  if (!hasPermission(livrablePermissions.livrableRead, context)) {
    redirect('/');
  }

  return <LivrableView id={params.id} context={context} />;
}
