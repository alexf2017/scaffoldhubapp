import { StatusWithRelationships } from 'src/features/status/statusSchemas';
import { membershipLabel } from 'src/features/membership/membershipLabel';
import { AppContext } from 'src/shared/controller/appContext';
import { enumeratorLabel } from 'src/shared/lib/enumeratorLabel';
import { formatDecimal } from 'src/shared/lib/formatDecimal';
import { Locale } from 'src/translation/locales';

export function statusExporterMapper(
  status: StatusWithRelationships[],
  context: AppContext,
): Record<string, string | null | undefined>[] {
  return status.map((status) => {
    return {
      id: status.id,
      name: status.name,
      createdByMembership: membershipLabel(status.createdByMembership, context.dictionary),
      createdAt: String(status.createdAt),
      updatedByMembership: membershipLabel(status.createdByMembership, context.dictionary),
      updatedAt: String(status.updatedAt),
    };
  });
}
