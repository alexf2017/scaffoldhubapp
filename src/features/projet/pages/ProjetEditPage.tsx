import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import ProjetEdit from 'src/features/projet/components/ProjetEdit';
import { permissions } from 'src/features/permissions';
import { hasPermission } from 'src/features/security';
import { appContextForReact } from 'src/shared/controller/appContext';
import { getDictionary } from 'src/translation/getDictionary';
import { getLocaleFromCookies } from 'src/translation/getLocaleFromCookies';

export async function generateMetadata() {
  const locale = getLocaleFromCookies(cookies());
  const dictionary = await getDictionary(locale);

  return {
    title: dictionary.projet.edit.title,
  };
}

export default async function ProjetEditPage({
  params,
}: {
  params: { id: string };
}) {
  const context = await appContextForReact(cookies());

  if (!hasPermission(permissions.projetUpdate, context)) {
    return redirect('/');
  }

  return <ProjetEdit context={context} id={params.id} />;
}
