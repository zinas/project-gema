module.exports = {
  attributes: {
    name: { type: 'string', required: true },
    description: { type: 'string', },
    value: { type: 'integer', },
    level: { type: 'integer', },
    modifiers: { type: 'array' },
  }
};
