import { useState } from "react";
import { useDatabase } from "../../dataLayer/context/DatabaseContext";
import type { Comment } from "../../types";

export const useAddComment = () => {
  const { safelyExecute } = useDatabase();
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  const addComment = async ({
    id,
    content,
    postId,
    parentId,
    authorId,
  }: Comment) => {
    setLoading(true);
    try {
      await safelyExecute(async (db) => {
        const now = new Date().toISOString();

        const post = await db.collections.posts.findOne({
          selector: { id: postId }
        }).exec();

        if (!post) {
          throw new Error("Post not found");
        }

        if(!parentId) {
          await post.modify(docData => {
            docData.updatedAt = now;
            docData.commentCount = (docData.commentCount || 0) + 1;
            return docData;
          });
        }

        const newComment = {
          id,
          postId,
          authorId,
          parentId,
          content,
          createdAt: now,
          updatedAt: now
        };

        const comment = await db.collections.comments.insert(newComment);
        setLoading(false);

        return comment;
      });
    } catch (error) {
      console.error("Error adding comment:", error);
      setError(error instanceof Error ? error : new Error(String(error)));
    }
  };

  return { addComment, loading, error };
};
