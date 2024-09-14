import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import StatusNew from 'src/features/status/components/StatusNew';
import { statusPermissions } from 'src/features/status/statusPermissions';
import { hasPermission } from 'src/features/security';
import Breadcrumb from 'src/shared/components/Breadcrumb';
import { appContextForReact } from 'src/shared/controller/appContext';
import { getDictionary } from 'src/translation/getDictionary';
import { getLocaleFromCookies } from 'src/translation/getLocaleFromCookies';

export async function generateMetadata() {
  const locale = getLocaleFromCookies(cookies());
  const dictionary = await getDictionary(locale);

  return {
    title: dictionary.status.new.title,
  };
}

export default async function StatusNewPage() {
  const context = await appContextForReact(cookies());
  const dictionary = context.dictionary;

  if (!hasPermission(statusPermissions.statusCreate, context)) {
    return redirect('/');
  }

  return (
    <div className="flex flex-1 flex-col">
      <Breadcrumb
        items={[
          [dictionary.status.list.menu, '/status'],
          [dictionary.status.new.menu],
        ]}
      />
      <div className="my-10">
        <StatusNew context={context} />
      </div>
    </div>
  );
}
