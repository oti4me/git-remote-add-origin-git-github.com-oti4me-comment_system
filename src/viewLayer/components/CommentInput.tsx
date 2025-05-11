import { useState, useRef, type ChangeEvent } from "react";
import { Button } from "./Button";
import { Textarea } from "./Textarea";

interface CommentInputProps {
  isSubComment?: boolean;
  onSubmit?: (comment: string) => void;
  onClear?: () => void;
}

const MIN_TEXTAREA_HEIGHT = 100;
const PADDING_ADJUSTMENT = 30;

export const CommentInput = ({
  isSubComment = false,
  onSubmit,
  onClear,
}: CommentInputProps) => {
  const [comment, setComment] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  const adjustTextareaHeight = (textarea: HTMLTextAreaElement) => {
    textarea.style.height = "auto";
    const padding =
      textarea.scrollHeight > MIN_TEXTAREA_HEIGHT ? PADDING_ADJUSTMENT : 0;
    textarea.style.height = `${Math.max(MIN_TEXTAREA_HEIGHT, textarea.scrollHeight + padding)}px`;
  };

  const handleSubmit = () => {
    const trimmedComment = comment.trim();
    if (!trimmedComment) return;

    onSubmit?.(trimmedComment);
    setComment("");
  };

  const handleClear = () => {
    setComment("");
    onClear?.();
  };

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setComment(e.target.value);
    if (textareaRef.current) {
      adjustTextareaHeight(textareaRef.current);
    }
  };

  return (
    <div className="relative mt-4" role="form" aria-label="Comment form">
      <Textarea
        text={comment}
        ref={textareaRef}
        onChange={handleChange}
        placeholder="Add a comment..."
        aria-label="Comment text"
      />
      <div className="absolute right-5 bottom-2 transition-opacity duration-200">
        <div className="mb-2 flex space-x-2">
          <Button
            text={isSubComment ? "Cancel" : "Clear"}
            onClick={handleClear}
            type="secondary"
            aria-label={isSubComment ? "Cancel reply" : "Clear comment"}
          />
          <Button
            text="Comment"
            onClick={handleSubmit}
            disabled={!comment.trim()}
            aria-label="Submit comment"
          />
        </div>
      </div>
    </div>
  );
};
