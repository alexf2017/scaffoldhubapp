import Link from 'next/link';
import { LuPlus } from 'react-icons/lu';
import { permissions } from 'src/features/permissions';
import { hasPermission } from 'src/features/security';
import { Button } from 'src/shared/components/ui/button';
import { AppContext } from 'src/shared/controller/appContext';

export function StatusNewButton({ context }: { context: AppContext }) {
  if (!hasPermission(permissions.statusCreate, context)) {
    return null;
  }

  return (
    <Button asChild>
      <Link href="/status/new" prefetch={false}>
        <LuPlus className="mr-2 h-4 w-4" /> {context.dictionary.status.new.menu}
      </Link>
    </Button>
  );
}
