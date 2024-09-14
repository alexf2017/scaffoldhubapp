import { ProjetWithRelationships } from 'src/features/projet/projetSchemas';
import { membershipLabel } from 'src/features/membership/membershipLabel';
import { AppContext } from 'src/shared/controller/appContext';
import { enumeratorLabel } from 'src/shared/lib/enumeratorLabel';
import { formatDecimal } from 'src/shared/lib/formatDecimal';
import { Locale } from 'src/translation/locales';

export function projetExporterMapper(
  projets: ProjetWithRelationships[],
  context: AppContext,
): Record<string, string | null | undefined>[] {
  return projets.map((projet) => {
    return {
      id: projet.id,
      title: projet.title,
      isDone: projet.isDone
        ? context.dictionary.shared.yes
        : context.dictionary.shared.no,
      createdByMembership: membershipLabel(projet.createdByMembership, context.dictionary),
      createdAt: String(projet.createdAt),
      updatedByMembership: membershipLabel(projet.createdByMembership, context.dictionary),
      updatedAt: String(projet.updatedAt),
    };
  });
}
