import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import WorkflowNew from 'src/features/workflow/components/WorkflowNew';
import { workflowPermissions } from 'src/features/workflow/workflowPermissions';
import { hasPermission } from 'src/features/security';
import Breadcrumb from 'src/shared/components/Breadcrumb';
import { appContextForReact } from 'src/shared/controller/appContext';
import { getDictionary } from 'src/translation/getDictionary';
import { getLocaleFromCookies } from 'src/translation/getLocaleFromCookies';

export async function generateMetadata() {
  const locale = getLocaleFromCookies(cookies());
  const dictionary = await getDictionary(locale);

  return {
    title: dictionary.workflow.new.title,
  };
}

export default async function WorkflowNewPage() {
  const context = await appContextForReact(cookies());
  const dictionary = context.dictionary;

  if (!hasPermission(workflowPermissions.workflowCreate, context)) {
    return redirect('/');
  }

  return (
    <div className="flex flex-1 flex-col">
      <Breadcrumb
        items={[
          [dictionary.workflow.list.menu, '/workflow'],
          [dictionary.workflow.new.menu],
        ]}
      />
      <div className="my-10">
        <WorkflowNew context={context} />
      </div>
    </div>
  );
}
