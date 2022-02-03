export default {
  type: 'object',
  properties: {
    username: { type: 'string' },
    hashPassword: { type: 'string' },
    profileId: { type: 'number' },
    isAdmin: { type: 'boolean' },
  },
  required: ['username', 'hashPassword', 'profileId'],
} as const;
