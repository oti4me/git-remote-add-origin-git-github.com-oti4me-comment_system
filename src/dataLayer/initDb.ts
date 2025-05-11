import { createDatabase } from "./database";

let db: Awaited<ReturnType<typeof createDatabase>> | null = null;

export const initDb = async () => {
  if (db) {
    return db;
  }

  db = await createDatabase();
  return db;
};

const seedBaseData = async (db: any) => {
  const userCollection = db.user;
  const postCollection = db.posts;

  const testUser = {
    id: "1",
    username: "john_doe",
    email: "BtB6E@example.com",
    password: "password123",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  await userCollection.insert([testUser]);

  await postCollection.insert([
    {
      id: testUser.id,
      title: "First Post",
      content: "This is the content of the first post.",
      authorId: testUser?.id,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
  ]);
};
