import { StatusWithRelationships } from 'src/features/status/statusSchemas';
import { StatusForm } from 'src/features/status/components/StatusForm';
import { AppContext } from 'src/shared/controller/appContext';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from 'src/shared/components/ui/sheet';

export function StatusFormSheet({
  status,
  context,
  onCancel,
  onSuccess,
}: {
  status?: Partial<StatusWithRelationships>;
  context: AppContext;
  onCancel: () => void;
  onSuccess: (status: StatusWithRelationships) => void;
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
            {status
              ? context.dictionary.status.edit.title
              : context.dictionary.status.new.title}
          </SheetTitle>
        </SheetHeader>

        <div className="pt-8">
          <StatusForm
            status={status}
            context={context}
            onCancel={onCancel}
            onSuccess={onSuccess}
          />
        </div>
      </SheetContent>
    </Sheet>
  );
}
