import Link from 'next/link';
import { LuPlus } from 'react-icons/lu';
import { permissions } from 'src/features/permissions';
import { hasPermission } from 'src/features/security';
import { Button } from 'src/shared/components/ui/button';
import { AppContext } from 'src/shared/controller/appContext';

export function WorkflowStepNewButton({ context }: { context: AppContext }) {
  if (!hasPermission(permissions.workflowStepCreate, context)) {
    return null;
  }

  return (
    <Button asChild>
      <Link href="/workflow-step/new" prefetch={false}>
        <LuPlus className="mr-2 h-4 w-4" /> {context.dictionary.workflowStep.new.menu}
      </Link>
    </Button>
  );
}
