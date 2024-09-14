import { CampanyWithRelationships } from 'src/features/campany/campanySchemas';
import { CampanyForm } from 'src/features/campany/components/CampanyForm';
import { AppContext } from 'src/shared/controller/appContext';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from 'src/shared/components/ui/sheet';

export function CampanyFormSheet({
  campany,
  context,
  onCancel,
  onSuccess,
}: {
  campany?: Partial<CampanyWithRelationships>;
  context: AppContext;
  onCancel: () => void;
  onSuccess: (campany: CampanyWithRelationships) => void;
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
            {campany
              ? context.dictionary.campany.edit.title
              : context.dictionary.campany.new.title}
          </SheetTitle>
        </SheetHeader>

        <div className="pt-8">
          <CampanyForm
            campany={campany}
            context={context}
            onCancel={onCancel}
            onSuccess={onSuccess}
          />
        </div>
      </SheetContent>
    </Sheet>
  );
}
