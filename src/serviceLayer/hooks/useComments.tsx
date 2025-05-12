import { useEffect, useState } from "react";
import type { Database } from "../../types";
import { useDatabase } from "../../dataLayer/context/DatabaseContext";
import { buildCommentTree } from "../../utils/db.ts";

export const useComments = (postId: string) => {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const { safelyExecute } = useDatabase();

  useEffect(() => {
    let sub: any;
    let active = true;

    const runQuery = async () => {
      await safelyExecute(async (db: Database) => {
        sub = db.comments
          .find({ selector: { postId } })
          .$.subscribe((docs: Array<CommentDoc>) => {
            if (!active) return;
            const plain = docs.map((doc: { toJSON: () => CommentDoc }) =>
              doc.toJSON(),
            );
            const tree = buildCommentTree(plain);
            setComments(tree);
            setLoading(false);
          });
      });
    };

    runQuery();

    return () => {
      active = false;
      if (sub) sub.unsubscribe();
    };
  }, [postId]);

  return { comments, loading };
};
