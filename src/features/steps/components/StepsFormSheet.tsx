import { StepsWithRelationships } from 'src/features/steps/stepsSchemas';
import { StepsForm } from 'src/features/steps/components/StepsForm';
import { AppContext } from 'src/shared/controller/appContext';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from 'src/shared/components/ui/sheet';

export function StepsFormSheet({
  steps,
  context,
  onCancel,
  onSuccess,
}: {
  steps?: Partial<StepsWithRelationships>;
  context: AppContext;
  onCancel: () => void;
  onSuccess: (steps: StepsWithRelationships) => void;
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
            {steps
              ? context.dictionary.steps.edit.title
              : context.dictionary.steps.new.title}
          </SheetTitle>
        </SheetHeader>

        <div className="pt-8">
          <StepsForm
            steps={steps}
            context={context}
            onCancel={onCancel}
            onSuccess={onSuccess}
          />
        </div>
      </SheetContent>
    </Sheet>
  );
}
