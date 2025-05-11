import type { Comment } from './comment';

export interface Post {
  title: string;
  author: string;
  content: string;
  upvotes: number;
  timestamp: string;
  comments?: Comment[];
}
