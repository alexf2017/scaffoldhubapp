import { WorkflowStepWithRelationships } from 'src/features/workflowStep/workflowStepSchemas';
import { WorkflowStepForm } from 'src/features/workflowStep/components/WorkflowStepForm';
import { AppContext } from 'src/shared/controller/appContext';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from 'src/shared/components/ui/sheet';

export function WorkflowStepFormSheet({
  workflowStep,
  context,
  onCancel,
  onSuccess,
}: {
  workflowStep?: Partial<WorkflowStepWithRelationships>;
  context: AppContext;
  onCancel: () => void;
  onSuccess: (workflowStep: WorkflowStepWithRelationships) => void;
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
            {workflowStep
              ? context.dictionary.workflowStep.edit.title
              : context.dictionary.workflowStep.new.title}
          </SheetTitle>
        </SheetHeader>

        <div className="pt-8">
          <WorkflowStepForm
            workflowStep={workflowStep}
            context={context}
            onCancel={onCancel}
            onSuccess={onSuccess}
          />
        </div>
      </SheetContent>
    </Sheet>
  );
}
