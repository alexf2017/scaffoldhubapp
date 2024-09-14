import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import CampanyNew from 'src/features/campany/components/CampanyNew';
import { campanyPermissions } from 'src/features/campany/campanyPermissions';
import { hasPermission } from 'src/features/security';
import Breadcrumb from 'src/shared/components/Breadcrumb';
import { appContextForReact } from 'src/shared/controller/appContext';
import { getDictionary } from 'src/translation/getDictionary';
import { getLocaleFromCookies } from 'src/translation/getLocaleFromCookies';

export async function generateMetadata() {
  const locale = getLocaleFromCookies(cookies());
  const dictionary = await getDictionary(locale);

  return {
    title: dictionary.campany.new.title,
  };
}

export default async function CampanyNewPage() {
  const context = await appContextForReact(cookies());
  const dictionary = context.dictionary;

  if (!hasPermission(campanyPermissions.campanyCreate, context)) {
    return redirect('/');
  }

  return (
    <div className="flex flex-1 flex-col">
      <Breadcrumb
        items={[
          [dictionary.campany.list.menu, '/campany'],
          [dictionary.campany.new.menu],
        ]}
      />
      <div className="my-10">
        <CampanyNew context={context} />
      </div>
    </div>
  );
}
