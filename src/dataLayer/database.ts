import { getRxStorageDexie } from "rxdb/plugins/storage-dexie";
import { RxDBDevModePlugin } from "rxdb/plugins/dev-mode";
import { wrappedValidateAjvStorage } from "rxdb/plugins/validate-ajv";
import { commentSchema, postSchema, userSchema } from "./schemas";
import { addRxPlugin, createRxDatabase } from "rxdb";
import { RxDBUpdatePlugin } from 'rxdb/plugins/update';
import type { Database } from "../types";
import { testPosts, testUsers } from "./mockData.ts";

const DATABASE_NAME = "post_comment";
let dbInstance: Database | null = null;

if (process.env.NODE_ENV === "development") {
  addRxPlugin(RxDBDevModePlugin);
}
addRxPlugin(RxDBUpdatePlugin);

export const createDatabase = async (): Promise<Database> => {
  if (dbInstance) {
    return dbInstance;
  }

  try {
    dbInstance = await createRxDatabase<Database>({
      name: DATABASE_NAME,
      storage: wrappedValidateAjvStorage({
        storage: getRxStorageDexie(),
      }),
      multiInstance: false,
      ignoreDuplicate: false,
      closeDuplicates: true,
      options: {
        cleanupOnClose: true,
      },
    });

    if (!dbInstance.collections.comments) {
      await dbInstance.addCollections({
        comments: {
          schema: commentSchema,
        },
        posts: {
          schema: postSchema,
        },
        user: {
          schema: userSchema,
        },
      });
    }

    await seedBaseData(dbInstance);

    return dbInstance;
  } catch (error) {
    console.log(error, "created database error...");
    console.error("Error creating database:", error);
  }

  // Set up replication here

  return dbInstance as Database;
};

/**
 * Safely closes the database and cleans up resources
 * @returns Promise that resolves when database is successfully destroyed
 */
export const closeDatabase = async (): Promise<void> => {
  try {
    if (dbInstance && !dbInstance.destroyed) {
      await dbInstance.destroy();
      console.log("Database instance successfully destroyed");
    }
  } catch (error) {
    console.error("Error closing database:", error);
    dbInstance = null;
  }
};

/**
 * Seeds the database with initial data only if no posts exist
 * @param db The database instance
 * @returns Promise that resolves when seeding is complete
 */
export const seedBaseData = async (db: any) => {
  try {
    const postCount = await db.posts.count().exec();
    const testPost = testPosts[0];
    const mockUser = testUsers[0];

    if (postCount === 0) {
      const userCollection = db.user;
      const postCollection = db.posts;

      const testUser = {
        id: mockUser.id,
        username: mockUser.username,
        email: mockUser.email,
        password: mockUser.password,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      const existingUser = await userCollection
        .findOne({
          selector: { id: testUser.id },
        })
        .exec();

      if (!existingUser) {
        await userCollection.insert(testUser);
        console.log("Seeded test user");
      }

      await postCollection.insert({
        id: testPost.id,
        title: testPost.title,
        content: testPost.content,
        authorId: testPost.authorId,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      });

      console.log("Seeded test post");
      console.log("Database seeding completed successfully");
    } else {
      console.log("Posts already exist, skipping database seeding");
    }
  } catch (error) {
    console.error("Error seeding database:", error);
    throw error;
  }
};
