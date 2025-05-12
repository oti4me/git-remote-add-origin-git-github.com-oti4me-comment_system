import { useEffect, useState } from "react";
import { useDatabase } from "../../dataLayer/context/DatabaseContext";
import type { Post } from "../../types";

export const usePosts = () => {
  const { safelyExecute } = useDatabase();
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchPosts = async () => {
    setLoading(true);
    let subscription: unknown;

    const loadPosts = async () => {
      try {
        await safelyExecute(async (db) => {
          subscription = db.collections.posts.find().$.subscribe(postDocuments => {
            const posts = postDocuments.map((doc: { toJSON: () => Post }) => {
              return doc.toJSON();
            });

            setPosts(posts);
            setLoading(false);
          });
        });
      } catch (error) {
        console.error("Error loading posts:", error);
        setError(error instanceof Error ? error : new Error(String(error)));
      }
    };

    loadPosts();

    return () => {
      if (subscription) subscription.unsubscribe();
    };
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return { posts, loading, error };
};
