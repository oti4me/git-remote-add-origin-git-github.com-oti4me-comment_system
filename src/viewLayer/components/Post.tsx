import type { Post as PostType } from "../../types/post";
import { CommentCount } from "./CommentCount";
import { Likes } from "./Likes";
import { CommentInput } from "./CommentInput";
import { Comments } from "./Comments";
import { Author } from "./Author";

const Post = ({ post }: { post: PostType }) => {
  return (
    <article className="mx-auto max-w-2xl rounded-lg bg-white p-6 text-[0.9rem] shadow-md">
      <header className="flex items-start space-x-4">
        <div className="flex-1">
          <h2 className="text-xl font-semibold text-gray-900">{post.title}</h2>
          <Author author={post.author} timestamp={post.timestamp} />
        </div>
      </header>

      <section className="mt-4 text-gray-700">
        <p>{post.content}</p>
      </section>

      <section className="mt-4 flex space-x-4 border-t border-gray-200 pt-4">
        <CommentCount count={post.comments.length} />
        <Likes upvotes={post.upvotes} />
      </section>

      <CommentInput />

      <section className="mt-6 border-t border-gray-200 pt-6">
        <h2 className="text-lg font-semibold text-gray-900">Comments</h2>
        <section className="mt-4 space-y-4">
          {post.comments.map((comment) => (
            <Comments key={comment.id} comment={comment} />
          ))}
        </section>
      </section>
    </article>
  );
};

export default Post;
