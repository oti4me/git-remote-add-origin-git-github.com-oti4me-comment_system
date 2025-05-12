import { usePosts } from "../../serviceLayer/hooks";
import Post from "./Post";

function App() {
  const { posts, loading, error } = usePosts();

  if (loading) {
    console.log("Loading posts...");
    return <div>Loading...</div>;
  }

  if (error) {
    console.error("Error fetching posts:", error);
    return <div>Error: {JSON.stringify(error)}</div>;
  }

  return (
    <div className="mt-20">
      {posts.length > 0 ? (
        <Post post={posts[0]} />
      ) : (
        <div>No post created yet!</div>
      )}
    </div>
  );
}

export default App;
