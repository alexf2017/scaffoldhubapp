import { ProjetWithRelationships } from 'src/features/projet/projetSchemas';
import { ProjetForm } from 'src/features/projet/components/ProjetForm';
import { AppContext } from 'src/shared/controller/appContext';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from 'src/shared/components/ui/sheet';

export function ProjetFormSheet({
  projet,
  context,
  onCancel,
  onSuccess,
}: {
  projet?: Partial<ProjetWithRelationships>;
  context: AppContext;
  onCancel: () => void;
  onSuccess: (projet: ProjetWithRelationships) => void;
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
            {projet
              ? context.dictionary.projet.edit.title
              : context.dictionary.projet.new.title}
          </SheetTitle>
        </SheetHeader>

        <div className="pt-8">
          <ProjetForm
            projet={projet}
            context={context}
            onCancel={onCancel}
            onSuccess={onSuccess}
          />
        </div>
      </SheetContent>
    </Sheet>
  );
}
