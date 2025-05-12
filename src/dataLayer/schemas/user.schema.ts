export const userSchema = {
  title: "user schema",
  version: 0,
  description: "Describes a user in the system",
  primaryKey: "id",
  type: "object",
  properties: {
    id: {
      type: "string",
      maxLength: 100,
    },
    username: {
      type: "string",
      maxLength: 100,
      minLength: 3,
    },
    email: {
      type: "string",
      maxLength: 100,
    },
    password: {
      type: "string",
      minLength: 4,
    },
    avatarUrl: {
      type: "string",
      default: "",
    },
    createdAt: {
      type: "string",
    },
    updatedAt: {
      type: "string",
    },
  },
  required: ["id", "username", "email", "createdAt", "updatedAt"],
  indexes: ["username", "email"],
};
