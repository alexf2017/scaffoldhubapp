import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import LivrableNew from 'src/features/livrable/components/LivrableNew';
import { livrablePermissions } from 'src/features/livrable/livrablePermissions';
import { hasPermission } from 'src/features/security';
import Breadcrumb from 'src/shared/components/Breadcrumb';
import { appContextForReact } from 'src/shared/controller/appContext';
import { getDictionary } from 'src/translation/getDictionary';
import { getLocaleFromCookies } from 'src/translation/getLocaleFromCookies';

export async function generateMetadata() {
  const locale = getLocaleFromCookies(cookies());
  const dictionary = await getDictionary(locale);

  return {
    title: dictionary.livrable.new.title,
  };
}

export default async function LivrableNewPage() {
  const context = await appContextForReact(cookies());
  const dictionary = context.dictionary;

  if (!hasPermission(livrablePermissions.livrableCreate, context)) {
    return redirect('/');
  }

  return (
    <div className="flex flex-1 flex-col">
      <Breadcrumb
        items={[
          [dictionary.livrable.list.menu, '/livrable'],
          [dictionary.livrable.new.menu],
        ]}
      />
      <div className="my-10">
        <LivrableNew context={context} />
      </div>
    </div>
  );
}
