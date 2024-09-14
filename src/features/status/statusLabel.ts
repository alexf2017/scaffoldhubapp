import { Status } from '@prisma/client';
import { Dictionary } from 'src/translation/locales';


export function statusLabel(status?: Partial<Status> | null, dictionary?: Dictionary) {
  return String(status?.name != null ? status.name : '');
}
