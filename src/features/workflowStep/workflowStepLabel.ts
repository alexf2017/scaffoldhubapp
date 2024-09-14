import { WorkflowStep } from '@prisma/client';
import { Dictionary } from 'src/translation/locales';


export function workflowStepLabel(workflowStep?: Partial<WorkflowStep> | null, dictionary?: Dictionary) {
  return String(workflowStep?.order != null ? workflowStep.order : '');
}
