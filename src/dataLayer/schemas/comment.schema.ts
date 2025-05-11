export const commentSchema = {
  title: 'comment schema',
  version: 0,
  description: 'A schema for threaded comments with replies',
  primaryKey: 'id',
  type: 'object',
  properties: {
    id: {
      type: 'string',
      primary: true
    },
    content: {
      type: 'string'
    },
    authorId: {
      type: 'string'
    },
    parentId: {
      type: ['string', 'null'],
      default: null
    },
    likeCount: {
      type: 'integer',
      minimum: 0,
      default: 0
    },
    replyCount: {
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
  required: ['id', 'content', 'authorId', 'createdAt', 'updatedAt'],
  indexes: ['authorId', 'createdAt', 'parentId'],
  keyCompression: true
};
