module.exports = {
  attributes: {
    name: { type: 'string', required: true },
    description: { type: 'string', },
    value: { type: 'integer', },
    level: { type: 'integer', },
    modifiers: { type: 'array' },
    owner: { model: 'character' }
  },

  createFromTemplate: function (template, owner) {
    return Implant.create({
      name: template.name,
      description: template.description,
      value: template.value,
      level: template.level,
      modifiers: template.modifiers,
      owner: owner.id
    });
  }
};
