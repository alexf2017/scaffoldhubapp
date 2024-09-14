import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { ProjetView } from 'src/features/projet/components/ProjetView';
import { projetPermissions } from 'src/features/projet/projetPermissions';
import { hasPermission } from 'src/features/security';
import { appContextForReact } from 'src/shared/controller/appContext';
import { getDictionary } from 'src/translation/getDictionary';
import { getLocaleFromCookies } from 'src/translation/getLocaleFromCookies';

export async function generateMetadata() {
  const locale = getLocaleFromCookies(cookies());
  const dictionary = await getDictionary(locale);

  return {
    title: dictionary.projet.view.title,
  };
}

export default async function ProjetViewPage({
  params,
}: {
  params: { id: string };
}) {
  const context = await appContextForReact(cookies());

  if (!hasPermission(projetPermissions.projetRead, context)) {
    redirect('/');
  }

  return <ProjetView id={params.id} context={context} />;
}
