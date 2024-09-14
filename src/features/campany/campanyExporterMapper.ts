import { CampanyWithRelationships } from 'src/features/campany/campanySchemas';
import { membershipLabel } from 'src/features/membership/membershipLabel';
import { AppContext } from 'src/shared/controller/appContext';
import { enumeratorLabel } from 'src/shared/lib/enumeratorLabel';
import { formatDecimal } from 'src/shared/lib/formatDecimal';
import { Locale } from 'src/translation/locales';

export function campanyExporterMapper(
  campanies: CampanyWithRelationships[],
  context: AppContext,
): Record<string, string | null | undefined>[] {
  return campanies.map((campany) => {
    return {
      id: campany.id,
      name: campany.name,
      urlSiteOfficiel: campany.urlSiteOfficiel,
      adresse: campany.adresse,
      government: campany.government,
      createdByMembership: membershipLabel(campany.createdByMembership, context.dictionary),
      createdAt: String(campany.createdAt),
      updatedByMembership: membershipLabel(campany.createdByMembership, context.dictionary),
      updatedAt: String(campany.updatedAt),
    };
  });
}
