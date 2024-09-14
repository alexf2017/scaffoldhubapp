import { WorkflowWithRelationships } from 'src/features/workflow/workflowSchemas';
import { stepsLabel } from 'src/features/steps/stepsLabel';
import { membershipLabel } from 'src/features/membership/membershipLabel';
import { AppContext } from 'src/shared/controller/appContext';
import { enumeratorLabel } from 'src/shared/lib/enumeratorLabel';
import { formatDecimal } from 'src/shared/lib/formatDecimal';
import { Locale } from 'src/translation/locales';

export function workflowExporterMapper(
  workflows: WorkflowWithRelationships[],
  context: AppContext,
): Record<string, string | null | undefined>[] {
  return workflows.map((workflow) => {
    return {
      id: workflow.id,
      title: workflow.title,
      steps: workflow.steps?.map((current) => stepsLabel(current, context.dictionary)).join(', '),
      createdByMembership: membershipLabel(workflow.createdByMembership, context.dictionary),
      createdAt: String(workflow.createdAt),
      updatedByMembership: membershipLabel(workflow.createdByMembership, context.dictionary),
      updatedAt: String(workflow.updatedAt),
    };
  });
}
