import { Steps } from '@prisma/client';
import { Dictionary } from 'src/translation/locales';


export function stepsLabel(steps?: Partial<Steps> | null, dictionary?: Dictionary) {
  return String(steps?.title != null ? steps.title : '');
}
