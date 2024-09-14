import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { WorkflowView } from 'src/features/workflow/components/WorkflowView';
import { workflowPermissions } from 'src/features/workflow/workflowPermissions';
import { hasPermission } from 'src/features/security';
import { appContextForReact } from 'src/shared/controller/appContext';
import { getDictionary } from 'src/translation/getDictionary';
import { getLocaleFromCookies } from 'src/translation/getLocaleFromCookies';

export async function generateMetadata() {
  const locale = getLocaleFromCookies(cookies());
  const dictionary = await getDictionary(locale);

  return {
    title: dictionary.workflow.view.title,
  };
}

export default async function WorkflowViewPage({
  params,
}: {
  params: { id: string };
}) {
  const context = await appContextForReact(cookies());

  if (!hasPermission(workflowPermissions.workflowRead, context)) {
    redirect('/');
  }

  return <WorkflowView id={params.id} context={context} />;
}
