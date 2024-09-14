import { CommentWithRelationships } from 'src/features/comment/commentSchemas';
import { membershipLabel } from 'src/features/membership/membershipLabel';
import { AppContext } from 'src/shared/controller/appContext';
import { enumeratorLabel } from 'src/shared/lib/enumeratorLabel';
import { formatDecimal } from 'src/shared/lib/formatDecimal';
import { Locale } from 'src/translation/locales';

export function commentExporterMapper(
  comments: CommentWithRelationships[],
  context: AppContext,
): Record<string, string | null | undefined>[] {
  return comments.map((comment) => {
    return {
      id: comment.id,
      context: comment.context,
      createdByMembership: membershipLabel(comment.createdByMembership, context.dictionary),
      createdAt: String(comment.createdAt),
      updatedByMembership: membershipLabel(comment.createdByMembership, context.dictionary),
      updatedAt: String(comment.updatedAt),
    };
  });
}
