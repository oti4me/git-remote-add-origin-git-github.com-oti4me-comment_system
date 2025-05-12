import type { Post as PostType } from "../../types/post";
import { CommentCount } from "./CommentCount";
import { Likes } from "./Likes";
import { CommentInput } from "./CommentInput";
import { Comments } from "./Comments";
import { Author } from "./Author";
import { useAddComment, useComments } from "../../serviceLayer";
import { v4 as uuidv4 } from "uuid";

const Post = ({ post }: { post: PostType }) => {
  const { comments } = useComments(post.id);
  const { addComment } = useAddComment();

  const handleAddComment = async (content: string) => {
    await addComment({
      id: uuidv4(),
      postId: post.id,
      parentId: null,
      content,
      authorId: uuidv4(),
    });
  };

  return (
    <article className="mx-auto max-w-2xl rounded-lg bg-white p-6 text-[0.9rem] shadow-md">
      <header className="flex items-start space-x-4">
        <div className="flex-1">
          <h2 className="text-xl font-semibold text-gray-900">{post.title}</h2>
          <Author author={post.authorId} timestamp={post.createdAt} />
        </div>
      </header>

      <section className="mt-4 text-gray-700">
        <p>{post.content}</p>
      </section>

      <section className="mt-4 flex space-x-4 border-t border-gray-200 pt-4">
        <CommentCount count={post.commentCount || 0} />
        <Likes upvotes={post.likeCount || 0} />
      </section>

      <CommentInput onSubmit={handleAddComment} />

      <section className="mt-6 border-t border-gray-200 pt-6">
        <h2 className="text-lg font-semibold text-gray-900">Comments</h2>
        <section className="mt-4 space-y-4">
          {comments.map((comment) => (
            <Comments key={uuidv4()} comment={comment} />
          ))}
        </section>
      </section>
    </article>
  );
};

export default Post;
