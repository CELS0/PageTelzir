export default {
  type: 'object',
  properties: {
    origin: { type: 'string' },
    destiny: { type: 'string' },
    pricing: { type: 'number' },
  },
  required: ['origin', 'destiny', 'pricing'],
} as const;
