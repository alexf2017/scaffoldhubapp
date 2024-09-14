import { LivrableWithRelationships } from 'src/features/livrable/livrableSchemas';
import { LivrableForm } from 'src/features/livrable/components/LivrableForm';
import { AppContext } from 'src/shared/controller/appContext';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from 'src/shared/components/ui/sheet';

export function LivrableFormSheet({
  livrable,
  context,
  onCancel,
  onSuccess,
}: {
  livrable?: Partial<LivrableWithRelationships>;
  context: AppContext;
  onCancel: () => void;
  onSuccess: (livrable: LivrableWithRelationships) => void;
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
            {livrable
              ? context.dictionary.livrable.edit.title
              : context.dictionary.livrable.new.title}
          </SheetTitle>
        </SheetHeader>

        <div className="pt-8">
          <LivrableForm
            livrable={livrable}
            context={context}
            onCancel={onCancel}
            onSuccess={onSuccess}
          />
        </div>
      </SheetContent>
    </Sheet>
  );
}
