import type { Comment } from "./comment";

export interface Post {
  id: string;
  title: string;
  authorId: string;
  content: string;
  likeCount: number;
  commentCount: number;
  createdAt: string;
  updatedAt: string;
  comments?: Comment[];
}
