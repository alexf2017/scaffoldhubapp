import { Campany } from '@prisma/client';
import { Dictionary } from 'src/translation/locales';


export function campanyLabel(campany?: Partial<Campany> | null, dictionary?: Dictionary) {
  return String(campany?.id != null ? campany.id : '');
}
