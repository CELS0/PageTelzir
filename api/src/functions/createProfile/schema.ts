export default {
  type: 'object',
  properties: {
    name: { type: 'string' },
    fone: { type: 'string' },
    planId: { type: 'number' },
  },
  required: ['name', 'fone'],
} as const;
