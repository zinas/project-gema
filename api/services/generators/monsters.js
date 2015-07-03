module.exports = function () {
  MonsterTemplate.create({
    name: 'Low-life Junkie',
    level: 1,
    aim: 5,
    speed: 5,
    stamina: 5,
    attack: 6,
    defence: 6,
    maxHP: 10,
    weapon: {
      name: 'Fists',
      damage: 2
    },
    armor: {
      name: 'T-shirt',
      protection: 0
    }
  }).exec(function (m) {
    console.log(m);
  });

  MonsterTemplate.create({
    name: 'Thug',
    level: 2,
    aim: 6,
    speed: 6,
    stamina: 6,
    attack: 8,
    defence: 14,
    maxHP: 18,
    weapon: {
      name: 'Crowbar',
      damage: 3
    },
    armor: {
      name: 'Leather jacket',
      protection: 1
    }
  }).exec(function (m) {
    console.log(m);
  });
}