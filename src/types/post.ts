export interface Comment {
  id: number;
  author: string;
  content: string;
  upvotes: number;
  timestamp: string;
  replies?: Comment[];
}

export interface Post {
  title: string;
  author: string;
  content: string;
  upvotes: number;
  timestamp: string;
  comments: Comment[];
}
