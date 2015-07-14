module.exports = function () {
  MonsterTemplate.create({
    name: 'Low-life Junkie',
    level: 1,
    aim: 1,
    speed: 1,
    stamina: 1,
    attack: 5,
    defence: 5,
    maxHP: 8,
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
    aim: 3,
    speed: 3,
    stamina: 3,
    attack: 5,
    defence: 8,
    maxHP: 12,
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

  MonsterTemplate.create({
    name: 'Drug dealer',
    level: 3,
    aim: 5,
    speed: 5,
    stamina: 5,
    attack: 7,
    defence: 5,
    maxHP: 20,
    weapon: {
      name: 'Knife',
      damage: 4
    },
    armor: {
      name: 'Leather jacket',
      protection: 1
    }
  }).exec(function (m) {
    console.log(m);
  });

  MonsterTemplate.create({
    name: 'Defective cyborg',
    level: 4,
    aim: 8,
    speed: 8,
    stamina: 12,
    attack: 7,
    defence: 7,
    maxHP: 34,
    weapon: {
      name: 'Metal punch',
      damage: 5
    },
    armor: {
      name: 'Synthetic skin',
      protection: 3
    }
  }).exec(function (m) {
    console.log(m);
  });

  MonsterTemplate.create({
    name: 'Corprorate security cadet',
    level: 5,
    aim: 10,
    speed: 10,
    stamina: 10,
    attack: 8,
    defence: 7,
    maxHP: 42,
    weapon: {
      name: 'Glock',
      damage: 6
    },
    armor: {
      name: 'Bulletproof vest',
      protection: 4
    }
  }).exec(function (m) {
    console.log(m);
  });

  MonsterTemplate.create({
    name: 'Mutant dog',
    level: 6,
    aim: 15,
    speed: 15,
    stamina: 3,
    attack: 10,
    defence: 5,
    maxHP: 50,
    weapon: {
      name: 'Bite',
      damage: 6
    },
    armor: {
      name: 'Dog skin',
      protection: 1
    }
  }).exec(function (m) {
    console.log(m);
  });

  MonsterTemplate.create({
    name: 'Bouncer',
    level: 7,
    aim: 10,
    speed: 10,
    stamina: 15,
    attack: 8,
    defence: 6,
    maxHP: 60,
    weapon: {
      name: 'Brass knuckles',
      damage: 6
    },
    armor: {
      name: 'Cheap suit',
      protection: 0
    }
  }).exec(function (m) {
    console.log(m);
  });

  MonsterTemplate.create({
    name: 'Hired gun',
    level: 8,
    aim: 15,
    speed: 11,
    stamina: 11,
    attack: 9,
    defence: 6,
    maxHP: 65,
    weapon: {
      name: 'Desert Eagle',
      damage: 10
    },
    armor: {
      name: 'Bulletproof vest',
      protection: 5
    }
  }).exec(function (m) {
    console.log(m);
  });

  MonsterTemplate.create({
    name: 'Riot police',
    level: 9,
    aim: 13,
    speed: 13,
    stamina: 13,
    attack: 8,
    defence: 8,
    maxHP: 73,
    weapon: {
      name: 'Stun battons',
      damage: 8
    },
    armor: {
      name: 'Full body armor',
      protection: 8
    }
  }).exec(function (m) {
    console.log(m);
  });

  MonsterTemplate.create({
    name: 'Nanite infused ninja',
    level: 10,
    aim: 15,
    speed: 20,
    stamina: 10,
    attack: 8,
    defence: 8,
    maxHP: 80,
    weapon: {
      name: 'Dual Katanas',
      damage: 12
    },
    armor: {
      name: 'Nanite protection',
      protection: 5
    }
  }).exec(function (m) {
    console.log(m);
  });
}