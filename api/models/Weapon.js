module.exports = {
  attributes: {
    name: { type: 'string', required: true },
    description: { type: 'string', },
    value: { type: 'integer', },
    level: { type: 'integer', },
    damage: { type: 'integer', required: true },
    modifiers: { type: 'array' },
    owner: { model: 'character' }
  },

  createFromTemplate: function (template, owner) {
    return Weapon.create({
      name: template.name,
      description: template.description,
      value: template.value,
      level: template.level,
      damage: template.damage,
      modifiers: template.modifiers,
      owner: owner.id
    });
  }
};