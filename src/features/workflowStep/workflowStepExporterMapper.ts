import { WorkflowStepWithRelationships } from 'src/features/workflowStep/workflowStepSchemas';
import { stepsLabel } from 'src/features/steps/stepsLabel';
import { workflowLabel } from 'src/features/workflow/workflowLabel';
import { membershipLabel } from 'src/features/membership/membershipLabel';
import { livrableLabel } from 'src/features/livrable/livrableLabel';
import { AppContext } from 'src/shared/controller/appContext';
import { enumeratorLabel } from 'src/shared/lib/enumeratorLabel';
import { formatDecimal } from 'src/shared/lib/formatDecimal';
import { Locale } from 'src/translation/locales';

export function workflowStepExporterMapper(
  workflowSteps: WorkflowStepWithRelationships[],
  context: AppContext,
): Record<string, string | null | undefined>[] {
  return workflowSteps.map((workflowStep) => {
    return {
      id: workflowStep.id,
      order: workflowStep.order?.toString(),
      responsible: membershipLabel(workflowStep.responsible, context.dictionary),
      observer: membershipLabel(workflowStep.observer, context.dictionary),
      livrable: livrableLabel(workflowStep.livrable, context.dictionary),
      steptitle: stepsLabel(workflowStep.steptitle, context.dictionary),
      workFlow: workflowLabel(workflowStep.workFlow, context.dictionary),
      isDone: workflowStep.isDone
        ? context.dictionary.shared.yes
        : context.dictionary.shared.no,
      createdByMembership: membershipLabel(workflowStep.createdByMembership, context.dictionary),
      createdAt: String(workflowStep.createdAt),
      updatedByMembership: membershipLabel(workflowStep.createdByMembership, context.dictionary),
      updatedAt: String(workflowStep.updatedAt),
    };
  });
}
