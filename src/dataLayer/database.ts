import {
  createRxDatabase,
  type RxDatabase as RxDatabaseType,
  type RxCollection,
  addRxPlugin
} from 'rxdb';
import { getRxStorageDexie } from 'rxdb/plugins/storage-dexie';
import { RxDBDevModePlugin } from 'rxdb/plugins/dev-mode';
import { wrappedValidateAjvStorage } from 'rxdb/plugins/validate-ajv';
import { commentSchema, postSchema, userSchema } from './schemas';
import type { Comment, Post, User } from '../types';

if (process.env.NODE_ENV === 'development') {
  addRxPlugin(RxDBDevModePlugin);
}

export type Collection = {
  posts: RxCollection<Post>;
  comments: RxCollection<Comment>;
  user: RxCollection<User>;
};

export type Database = RxDatabaseType<Collection>;

const DATABASE_NAME = 'post_comments';

export const createDatabase = async (): Promise<Database> => {
  const db = await createRxDatabase<Database>({
    name: DATABASE_NAME,
    storage: wrappedValidateAjvStorage({
      storage: getRxStorageDexie()
    }),
    multiInstance: true,
  });

  await db.addCollections({
    comments: {
      schema: commentSchema,
    },
    posts: {
      schema: postSchema,
    },
    user: {
      schema: userSchema,
    }
  });

  // Set up replication here

  return db;
};
