import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import WorkflowEdit from 'src/features/workflow/components/WorkflowEdit';
import { permissions } from 'src/features/permissions';
import { hasPermission } from 'src/features/security';
import { appContextForReact } from 'src/shared/controller/appContext';
import { getDictionary } from 'src/translation/getDictionary';
import { getLocaleFromCookies } from 'src/translation/getLocaleFromCookies';

export async function generateMetadata() {
  const locale = getLocaleFromCookies(cookies());
  const dictionary = await getDictionary(locale);

  return {
    title: dictionary.workflow.edit.title,
  };
}

export default async function WorkflowEditPage({
  params,
}: {
  params: { id: string };
}) {
  const context = await appContextForReact(cookies());

  if (!hasPermission(permissions.workflowUpdate, context)) {
    return redirect('/');
  }

  return <WorkflowEdit context={context} id={params.id} />;
}
