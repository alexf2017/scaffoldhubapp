import { LivrableWithRelationships } from 'src/features/livrable/livrableSchemas';
import { statusLabel } from 'src/features/status/statusLabel';
import { membershipLabel } from 'src/features/membership/membershipLabel';
import { AppContext } from 'src/shared/controller/appContext';
import { enumeratorLabel } from 'src/shared/lib/enumeratorLabel';
import { formatDecimal } from 'src/shared/lib/formatDecimal';
import { Locale } from 'src/translation/locales';

export function livrableExporterMapper(
  livrables: LivrableWithRelationships[],
  context: AppContext,
): Record<string, string | null | undefined>[] {
  return livrables.map((livrable) => {
    return {
      id: livrable.id,
      title: livrable.title,
      statusname: statusLabel(livrable.statusname, context.dictionary),
      createdByMembership: membershipLabel(livrable.createdByMembership, context.dictionary),
      createdAt: String(livrable.createdAt),
      updatedByMembership: membershipLabel(livrable.createdByMembership, context.dictionary),
      updatedAt: String(livrable.updatedAt),
    };
  });
}
