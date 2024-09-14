import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import StepsEdit from 'src/features/steps/components/StepsEdit';
import { permissions } from 'src/features/permissions';
import { hasPermission } from 'src/features/security';
import { appContextForReact } from 'src/shared/controller/appContext';
import { getDictionary } from 'src/translation/getDictionary';
import { getLocaleFromCookies } from 'src/translation/getLocaleFromCookies';

export async function generateMetadata() {
  const locale = getLocaleFromCookies(cookies());
  const dictionary = await getDictionary(locale);

  return {
    title: dictionary.steps.edit.title,
  };
}

export default async function StepsEditPage({
  params,
}: {
  params: { id: string };
}) {
  const context = await appContextForReact(cookies());

  if (!hasPermission(permissions.stepsUpdate, context)) {
    return redirect('/');
  }

  return <StepsEdit context={context} id={params.id} />;
}
