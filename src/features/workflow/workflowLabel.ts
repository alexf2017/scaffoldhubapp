import { Workflow } from '@prisma/client';
import { Dictionary } from 'src/translation/locales';


export function workflowLabel(workflow?: Partial<Workflow> | null, dictionary?: Dictionary) {
  return String(workflow?.title != null ? workflow.title : '');
}
