import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import WorkflowStepEdit from 'src/features/workflowStep/components/WorkflowStepEdit';
import { permissions } from 'src/features/permissions';
import { hasPermission } from 'src/features/security';
import { appContextForReact } from 'src/shared/controller/appContext';
import { getDictionary } from 'src/translation/getDictionary';
import { getLocaleFromCookies } from 'src/translation/getLocaleFromCookies';

export async function generateMetadata() {
  const locale = getLocaleFromCookies(cookies());
  const dictionary = await getDictionary(locale);

  return {
    title: dictionary.workflowStep.edit.title,
  };
}

export default async function WorkflowStepEditPage({
  params,
}: {
  params: { id: string };
}) {
  const context = await appContextForReact(cookies());

  if (!hasPermission(permissions.workflowStepUpdate, context)) {
    return redirect('/');
  }

  return <WorkflowStepEdit context={context} id={params.id} />;
}
