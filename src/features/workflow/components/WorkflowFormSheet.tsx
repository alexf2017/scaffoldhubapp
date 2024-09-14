import { WorkflowWithRelationships } from 'src/features/workflow/workflowSchemas';
import { WorkflowForm } from 'src/features/workflow/components/WorkflowForm';
import { AppContext } from 'src/shared/controller/appContext';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from 'src/shared/components/ui/sheet';

export function WorkflowFormSheet({
  workflow,
  context,
  onCancel,
  onSuccess,
}: {
  workflow?: Partial<WorkflowWithRelationships>;
  context: AppContext;
  onCancel: () => void;
  onSuccess: (workflow: WorkflowWithRelationships) => void;
}) {
  return (
    <Sheet
      open={true}
      onOpenChange={(open) => (!open ? onCancel() : null)}
      modal={true}
    >
      <SheetContent className="overflow-y-scroll sm:max-w-md">
        <SheetHeader>
          <SheetTitle>
            {workflow
              ? context.dictionary.workflow.edit.title
              : context.dictionary.workflow.new.title}
          </SheetTitle>
        </SheetHeader>

        <div className="pt-8">
          <WorkflowForm
            workflow={workflow}
            context={context}
            onCancel={onCancel}
            onSuccess={onSuccess}
          />
        </div>
      </SheetContent>
    </Sheet>
  );
}
