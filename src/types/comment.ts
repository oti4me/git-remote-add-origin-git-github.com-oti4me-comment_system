export interface Comment {
  id: number;
  authorId: string;
  parentId: string;
  content: string;
  createdAt: number;
  updatedAt: string;
  replies?: Comment[];
}
