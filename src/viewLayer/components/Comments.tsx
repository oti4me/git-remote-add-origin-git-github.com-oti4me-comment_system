import { useState } from "react";
import { MessageCircleMore, Trash2 } from "lucide-react";
import { Author } from "./Author";
import { Button } from "./Button";
import { CommentInput } from "./CommentInput";
import type { Comment as CommentType } from "../../types";
import { useAddComment } from "../../serviceLayer";
import { v4 as uuidv4 } from "uuid";
import { useDeleteComment } from "../../serviceLayer/hooks/deleteComment.tsx";

export const Comments = ({ comment }: { comment: CommentType }) => {
  const [expandedComments, setExpandedComments] = useState<number[]>([]);
  const [showCommentInput, setShowCommentInput] = useState<boolean>(false);
  const [isAuthenticated] = useState<boolean>(true);
  const { addComment } = useAddComment();
  const { deleteComment } = useDeleteComment();

  const toggleComment = (commentId: number) => {
    setExpandedComments((prev) =>
      prev.includes(commentId)
        ? prev.filter((id) => id !== commentId)
        : [...prev, commentId],
    );
  };

  const toggleCommentInputVisibility = () => {
    setShowCommentInput((prev) => !prev);
  };

  const handleDelete = async () => {
    await deleteComment(comment.id);
  };

  const handleAddComment = async (content: string) => {
    await addComment({
      id: uuidv4(),
      postId: comment.postId,
      parentId: comment.id,
      content,
      authorId: comment.authorId,
    });
  };

  return (
    <div className="mt-4 border-l-2 border-gray-200 pl-5">
      <div className="flex items-start space-x-2">
        <div className="flex-1">
          <Author author={comment.authorId} timestamp={comment.createdAt} />
          <p className="mt-1 text-gray-700">{comment.content}</p>
          <div className="mt-2 flex space-x-4">
            <Button
              text="Reply"
              variant="tertiary"
              onClick={toggleCommentInputVisibility}
              icon={<MessageCircleMore size={16} color="gray" />}
            />
            {isAuthenticated && (
              <Button
                text="Delete"
                variant="tertiary"
                onClick={handleDelete}
                icon={<Trash2 size={16} color="gray" />}
              />
            )}
          </div>
          <div>
            {showCommentInput && (
              <CommentInput
                onSubmit={handleAddComment}
                isSubComment
                onClear={toggleCommentInputVisibility}
              />
            )}
          </div>
          {comment.replies && comment.replies.length > 0 && (
            <button
              onClick={() => toggleComment(comment.id)}
              className="mt-2 cursor-pointer text-sm text-blue-500 hover:text-blue-600"
            >
              {expandedComments.includes(comment.id)
                ? "Hide replies"
                : `Show ${comment.replies.length} replies`}
            </button>
          )}
          {expandedComments.includes(comment.id) && comment.replies && (
            <div className="mt-2">
              {comment.replies.map((reply) => (
                <Comments key={reply.id} comment={reply} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
