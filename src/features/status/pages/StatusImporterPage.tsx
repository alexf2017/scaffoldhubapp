import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { StatusImporter } from 'src/features/status/components/StatusImporter';
import { permissions } from 'src/features/permissions';
import { hasPermission } from 'src/features/security';
import { appContextForReact } from 'src/shared/controller/appContext';
import { getDictionary } from 'src/translation/getDictionary';
import { getLocaleFromCookies } from 'src/translation/getLocaleFromCookies';

export async function generateMetadata() {
  const locale = getLocaleFromCookies(cookies());
  const dictionary = await getDictionary(locale);

  return {
    title: dictionary.shared.importer.title,
  };
}

export default async function StatusImporterPage() {
  const context = await appContextForReact(cookies());

  if (!hasPermission(permissions.statusImport, context)) {
    return redirect('/');
  }

  return <StatusImporter context={context} />;
}
