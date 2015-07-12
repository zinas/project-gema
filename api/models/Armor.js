module.exports = {
  attributes: {
    name: { type: 'string', required: true },
    description: { type: 'string', },
    value: { type: 'integer', },
    level: { type: 'integer', },
    protection: { type: 'integer', required: true },
    modifiers: { type: 'array' },
    owner: { model: 'character' }
  },

  createFromTemplate: function (template, owner) {
    return Armor.create({
      name: template.name,
      description: template.description,
      value: template.value,
      level: template.level,
      protection: template.protection,
      modifiers: template.modifiers,
      owner: owner.id
    });
  }

};