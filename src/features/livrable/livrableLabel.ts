import { Livrable } from '@prisma/client';
import { Dictionary } from 'src/translation/locales';


export function livrableLabel(livrable?: Partial<Livrable> | null, dictionary?: Dictionary) {
  return String(livrable?.title != null ? livrable.title : '');
}
