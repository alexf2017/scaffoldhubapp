import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { StepsView } from 'src/features/steps/components/StepsView';
import { stepsPermissions } from 'src/features/steps/stepsPermissions';
import { hasPermission } from 'src/features/security';
import { appContextForReact } from 'src/shared/controller/appContext';
import { getDictionary } from 'src/translation/getDictionary';
import { getLocaleFromCookies } from 'src/translation/getLocaleFromCookies';

export async function generateMetadata() {
  const locale = getLocaleFromCookies(cookies());
  const dictionary = await getDictionary(locale);

  return {
    title: dictionary.steps.view.title,
  };
}

export default async function StepsViewPage({
  params,
}: {
  params: { id: string };
}) {
  const context = await appContextForReact(cookies());

  if (!hasPermission(stepsPermissions.stepsRead, context)) {
    redirect('/');
  }

  return <StepsView id={params.id} context={context} />;
}
