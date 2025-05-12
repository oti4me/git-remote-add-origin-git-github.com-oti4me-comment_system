export interface Comment {
  id: string;
  authorId: string;
  postId: string;
  parentId: string | null;
  content: string;
  createdAt?: number;
  updatedAt?: string;
  replies?: Comment[];
}
