import { MessageCircleMore } from "lucide-react";
import { IconWrapper } from "./IconWrapper";

interface CommentCountProps {
  count: number;
  onClick?: () => void;
}

export const CommentCount = ({ count, onClick }: CommentCountProps) => {
  return (
    <IconWrapper onClick={onClick} aria-label={`${count} comments`}>
      <MessageCircleMore color="black" size={16} aria-hidden="true" />
      <span className="text-sm font-semibold text-gray-700">{count}</span>
    </IconWrapper>
  );
};
