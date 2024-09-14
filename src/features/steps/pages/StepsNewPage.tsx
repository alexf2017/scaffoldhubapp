import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import StepsNew from 'src/features/steps/components/StepsNew';
import { stepsPermissions } from 'src/features/steps/stepsPermissions';
import { hasPermission } from 'src/features/security';
import Breadcrumb from 'src/shared/components/Breadcrumb';
import { appContextForReact } from 'src/shared/controller/appContext';
import { getDictionary } from 'src/translation/getDictionary';
import { getLocaleFromCookies } from 'src/translation/getLocaleFromCookies';

export async function generateMetadata() {
  const locale = getLocaleFromCookies(cookies());
  const dictionary = await getDictionary(locale);

  return {
    title: dictionary.steps.new.title,
  };
}

export default async function StepsNewPage() {
  const context = await appContextForReact(cookies());
  const dictionary = context.dictionary;

  if (!hasPermission(stepsPermissions.stepsCreate, context)) {
    return redirect('/');
  }

  return (
    <div className="flex flex-1 flex-col">
      <Breadcrumb
        items={[
          [dictionary.steps.list.menu, '/steps'],
          [dictionary.steps.new.menu],
        ]}
      />
      <div className="my-10">
        <StepsNew context={context} />
      </div>
    </div>
  );
}
