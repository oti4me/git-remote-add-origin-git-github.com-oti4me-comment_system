import { useState } from "react";
import { useDatabase } from "../../dataLayer/context/DatabaseContext";

export const useDeleteComment = () => {
  const { safelyExecute } = useDatabase();
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  const deleteComment = async (id: string) => {
    setLoading(true);
    try {
      await safelyExecute(async (db) => {
        const comment = await db.collections.comments.findOne({ selector: { id } }).exec();

        if (comment) {
          if(!comment.parentId) {
            const now = new Date().toISOString();

            const post = await db.collections.posts.findOne({ selector: { id: comment.postId } }).exec();
            await post.modify(docData => {
              docData.updatedAt = now;
              docData.commentCount = docData.commentCount - 1;
              return docData;
            });
          }

          await comment.remove();
          setLoading(false);
        }
      });
    } catch (error) {
      setError(error instanceof Error ? error : new Error(String(error)));
    }
  };

  return { deleteComment, loading, error };
};
