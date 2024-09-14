import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import ProjetNew from 'src/features/projet/components/ProjetNew';
import { projetPermissions } from 'src/features/projet/projetPermissions';
import { hasPermission } from 'src/features/security';
import Breadcrumb from 'src/shared/components/Breadcrumb';
import { appContextForReact } from 'src/shared/controller/appContext';
import { getDictionary } from 'src/translation/getDictionary';
import { getLocaleFromCookies } from 'src/translation/getLocaleFromCookies';

export async function generateMetadata() {
  const locale = getLocaleFromCookies(cookies());
  const dictionary = await getDictionary(locale);

  return {
    title: dictionary.projet.new.title,
  };
}

export default async function ProjetNewPage() {
  const context = await appContextForReact(cookies());
  const dictionary = context.dictionary;

  if (!hasPermission(projetPermissions.projetCreate, context)) {
    return redirect('/');
  }

  return (
    <div className="flex flex-1 flex-col">
      <Breadcrumb
        items={[
          [dictionary.projet.list.menu, '/projet'],
          [dictionary.projet.new.menu],
        ]}
      />
      <div className="my-10">
        <ProjetNew context={context} />
      </div>
    </div>
  );
}
