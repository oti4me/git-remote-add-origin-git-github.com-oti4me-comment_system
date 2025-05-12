export const commentSchema = {
  title: "comment schema",
  version: 0,
  description: "A schema for threaded comments with replies",
  primaryKey: "id",
  type: "object",
  properties: {
    id: {
      type: "string",
      maxLength: 100,
    },
    content: {
      type: "string",
    },
    authorId: {
      type: "string",
      maxLength: 100,
    },
    parentId: {
      type: ["string", "null"],
      default: null,
      maxLength: 100,
    },
    postId: {
      type: "string",
      maxLength: 100,
    },
    likeCount: {
      type: "integer",
      minimum: 0,
      default: 0,
    },
    replyCount: {
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
  required: ["id", "content", "postId", "authorId", "createdAt", "updatedAt"],
  indexes: ["authorId", "postId", "createdAt"],
};
