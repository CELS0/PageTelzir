export default {
  type: 'object',
  properties: {
    title: { type: 'string' },
    description: { type: 'string' },
    timeExtend: { type: 'number' },
  },
  required: ['title', 'timeExtend'],
} as const;
