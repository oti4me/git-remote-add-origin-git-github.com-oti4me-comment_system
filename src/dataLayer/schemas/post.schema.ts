export const postSchema = {
  title: "post schema",
  version: 0,
  description: "describes a simple post",
  primaryKey: "id",
  type: "object",
  properties: {
    id: {
      type: "string",
      maxLength: 100,
    },
    title: {
      type: "string",
    },
    content: {
      type: "string",
    },
    authorId: {
      type: "string",
      maxLength: 100,
    },
    likeCount: {
      type: "integer",
      minimum: 0,
      default: 0,
    },
    commentCount: {
      type: "integer",
      minimum: 0,
      default: 0,
    },
    createdAt: {
      type: "string",
      maxLength: 100,
    },
    updatedAt: {
      type: "string",
    },
  },
  required: ["id", "title", "content", "authorId", "createdAt", "updatedAt"],
  indexes: ["authorId", "createdAt"],
};
