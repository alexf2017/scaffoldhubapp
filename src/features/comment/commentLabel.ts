import { Comment } from '@prisma/client';
import { Dictionary } from 'src/translation/locales';


export function commentLabel(comment?: Partial<Comment> | null, dictionary?: Dictionary) {
  return String(comment?.id != null ? comment.id : '');
}
