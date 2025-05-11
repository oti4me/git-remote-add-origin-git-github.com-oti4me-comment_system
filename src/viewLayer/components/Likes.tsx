import { ThumbsUp } from "lucide-react";
import { IconWrapper } from "./IconWrapper";

export const Likes = ({ upvotes }: { upvotes: number }) => {
  return (
    <IconWrapper>
      <ThumbsUp color="black" size={16} />
      <span className="text-sm font-semibold text-gray-700">{upvotes}</span>
    </IconWrapper>
  );
};
