export const userSchema = {
  title: 'user schema',
  version: 0,
  description: 'Describes a user in the system',
  primaryKey: 'id',
  type: 'object',
  properties: {
    id: {
      type: 'string',
      primary: true
    },
    username: {
      type: 'string',
      minLength: 3
    },
    email: {
      type: 'string',
      format: 'email'
    },
    password: {
      type: 'string',
      minLength: 60
    },
    avatarUrl: {
      type: 'string',
      format: 'uri',
      default: ''
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
  required: ['id', 'username', 'email', 'createdAt', 'updatedAt'],
  indexes: ['id', 'username', 'email'],
  keyCompression: true
};
