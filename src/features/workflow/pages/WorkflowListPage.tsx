import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import WorkflowList from 'src/features/workflow/components/WorkflowList';
import { workflowPermissions } from 'src/features/workflow/workflowPermissions';
import { hasPermission } from 'src/features/security';
import { appContextForReact } from 'src/shared/controller/appContext';
import { getDictionary } from 'src/translation/getDictionary';
import { getLocaleFromCookies } from 'src/translation/getLocaleFromCookies';

export async function generateMetadata() {
  const locale = getLocaleFromCookies(cookies());
  const dictionary = await getDictionary(locale);

  return {
    title: dictionary.workflow.list.title,
  };
}

export default async function WorkflowListPage() {
  const context = await appContextForReact(cookies());

  if (!hasPermission(workflowPermissions.workflowRead, context)) {
    return redirect('/');
  }

  return <WorkflowList context={context} />;
}
