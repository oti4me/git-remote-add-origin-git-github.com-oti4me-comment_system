import { type RxCollection, type RxDatabase } from "rxdb";
import type { Comment as CommentType } from "./comment";
import type { Post, Post as PostType } from "./post";
import type { User, User as UserType } from "./user";

export type RxDBCollections = {
  posts: RxCollection<PostType>;
  comments: RxCollection<CommentType>;
  user: RxCollection<UserType>;
};

export type Collection = {
  posts: RxCollection<Post>;
  comments: RxCollection<Comment>;
  user: RxCollection<User>;
};

export type Database = RxDatabase<Collection> & {
  destroyed: boolean;
  destroy: () => Promise<void>;
};