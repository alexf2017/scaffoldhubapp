import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import WorkflowStepNew from 'src/features/workflowStep/components/WorkflowStepNew';
import { workflowStepPermissions } from 'src/features/workflowStep/workflowStepPermissions';
import { hasPermission } from 'src/features/security';
import Breadcrumb from 'src/shared/components/Breadcrumb';
import { appContextForReact } from 'src/shared/controller/appContext';
import { getDictionary } from 'src/translation/getDictionary';
import { getLocaleFromCookies } from 'src/translation/getLocaleFromCookies';

export async function generateMetadata() {
  const locale = getLocaleFromCookies(cookies());
  const dictionary = await getDictionary(locale);

  return {
    title: dictionary.workflowStep.new.title,
  };
}

export default async function WorkflowStepNewPage() {
  const context = await appContextForReact(cookies());
  const dictionary = context.dictionary;

  if (!hasPermission(workflowStepPermissions.workflowStepCreate, context)) {
    return redirect('/');
  }

  return (
    <div className="flex flex-1 flex-col">
      <Breadcrumb
        items={[
          [dictionary.workflowStep.list.menu, '/workflow-step'],
          [dictionary.workflowStep.new.menu],
        ]}
      />
      <div className="my-10">
        <WorkflowStepNew context={context} />
      </div>
    </div>
  );
}
