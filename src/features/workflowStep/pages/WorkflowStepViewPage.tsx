import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { WorkflowStepView } from 'src/features/workflowStep/components/WorkflowStepView';
import { workflowStepPermissions } from 'src/features/workflowStep/workflowStepPermissions';
import { hasPermission } from 'src/features/security';
import { appContextForReact } from 'src/shared/controller/appContext';
import { getDictionary } from 'src/translation/getDictionary';
import { getLocaleFromCookies } from 'src/translation/getLocaleFromCookies';

export async function generateMetadata() {
  const locale = getLocaleFromCookies(cookies());
  const dictionary = await getDictionary(locale);

  return {
    title: dictionary.workflowStep.view.title,
  };
}

export default async function WorkflowStepViewPage({
  params,
}: {
  params: { id: string };
}) {
  const context = await appContextForReact(cookies());

  if (!hasPermission(workflowStepPermissions.workflowStepRead, context)) {
    redirect('/');
  }

  return <WorkflowStepView id={params.id} context={context} />;
}
