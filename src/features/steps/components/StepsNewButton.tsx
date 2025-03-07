import Link from 'next/link';
import { LuPlus } from 'react-icons/lu';
import { permissions } from 'src/features/permissions';
import { hasPermission } from 'src/features/security';
import { Button } from 'src/shared/components/ui/button';
import { AppContext } from 'src/shared/controller/appContext';

export function StepsNewButton({ context }: { context: AppContext }) {
  if (!hasPermission(permissions.stepsCreate, context)) {
    return null;
  }

  return (
    <Button asChild>
      <Link href="/steps/new" prefetch={false}>
        <LuPlus className="mr-2 h-4 w-4" /> {context.dictionary.steps.new.menu}
      </Link>
    </Button>
  );
}
