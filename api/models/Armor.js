module.exports = {
  attributes: {
    name: { type: 'string', required: true },
    description: { type: 'string', },
    value: { type: 'integer', },
    level: { type: 'integer', },
    protection: { type: 'integer', required: true },
    modifiers: { type: 'array' },
    owner: { model: 'character' }
  }
};