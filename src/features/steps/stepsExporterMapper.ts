import { StepsWithRelationships } from 'src/features/steps/stepsSchemas';
import { membershipLabel } from 'src/features/membership/membershipLabel';
import { AppContext } from 'src/shared/controller/appContext';
import { enumeratorLabel } from 'src/shared/lib/enumeratorLabel';
import { formatDecimal } from 'src/shared/lib/formatDecimal';
import { Locale } from 'src/translation/locales';

export function stepsExporterMapper(
  steps: StepsWithRelationships[],
  context: AppContext,
): Record<string, string | null | undefined>[] {
  return steps.map((steps) => {
    return {
      id: steps.id,
      title: steps.title,
      createdByMembership: membershipLabel(steps.createdByMembership, context.dictionary),
      createdAt: String(steps.createdAt),
      updatedByMembership: membershipLabel(steps.createdByMembership, context.dictionary),
      updatedAt: String(steps.updatedAt),
    };
  });
}
