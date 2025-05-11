export const postSchema = {
  title: 'post schema',
  version: 0,
  description: 'describes a simple post',
  primaryKey: 'id',
  type: 'object',
  properties: {
    id: {
      type: 'string',
      primary: true
    },
    title: {
      type: 'string'
    },
    content: {
      type: 'string'
    },
    authorId: {
      type: 'string'
    },
    likeCount: {
      type: 'integer',
      minimum: 0,
      default: 0
    },
    commentCount: {
      type: 'integer',
      minimum: 0,
      default: 0
    },
    createdAt: {
      type: 'string',
      format: 'date-time'
    },
    updatedAt: {
      type: 'string',
      format: 'date-time'
    }
  },
  required: ['id', 'title', 'content', 'authorId', 'createdAt', 'updatedAt'],
  indexes: ['authorId', 'createdAt'],
  keyCompression: true
};
