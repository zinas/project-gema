module.exports = function () {
  Level.create({
    uuid: 'san-francisco',
    name: 'San Francisco',
    description:
      'Once the proud center of the tech ecosystem, San Franscisco has now ' +
      'plunged into decay and corruption. Ruled by power hungry corporations ' +
      'streets are either occupied by criminals, or security personel guarding ' +
      'some company\'s premises.',
    rank: 1,
    minLevelAllowed: 1,
    maxLevelAllowed: 10,
    width: 5,
    height: 5
  }).exec(function (error, level) {
    console.log(error);
    Area.create({name: 'Lombard Street', x:1, y:1, level:level.id}).exec(function () {});
    Area.create({name: 'Embarcadero Centre', x:1, y:2, level:level.id}).exec(function () {});
    Area.create({name: 'Fort Mason', x:1, y:3, level:level.id}).exec(function () {});
    Area.create({name: 'Golden Gate Bridge', x:1, y:4, level:level.id}).exec(function () {});
    Area.create({name: 'Chinatown', x:1, y:5, level:level.id}).exec(function () {});
    Area.create({name: 'Coit Tower', x:2, y:1, level:level.id}).exec(function () {});
    Area.create({name: 'TransAmerica Pyramid', x:2, y:2, level:level.id}).exec(function () {});
    Area.create({name: 'Alamo square', x:2, y:3, level:level.id}).exec(function () {});
    Area.create({name: 'Alcatraz', x:2, y:4, level:level.id}).exec(function () {});
    Area.create({name: 'Golden Gate PArk', x:2, y:5, level:level.id}).exec(function () {});
    Area.create({name: 'Union Square', x:3, y:1, level:level.id}).exec(function () {});
    Area.create({name: 'Pier 39', x:3, y:2, level:level.id}).exec(function () {});
    Area.create({name: 'Palace of Fine Arts', x:3, y:3, level:level.id}).exec(function () {});
    Area.create({name: 'Bay Bridge', x:3, y:4, level:level.id}).exec(function () {});
    Area.create({name: 'Hyde Street Pier', x:3, y:5, level:level.id}).exec(function () {});
    Area.create({name: 'MoMA', x:4, y:1, level:level.id}).exec(function () {});
    Area.create({name: 'Botanical Garden', x:4, y:2, level:level.id}).exec(function () {});
    Area.create({name: 'Haight Street', x:4, y:3, level:level.id}).exec(function () {});
    Area.create({name: 'The Presidio', x:4, y:4, level:level.id}).exec(function () {});
    Area.create({name: 'The Exploratorium', x:4, y:5, level:level.id}).exec(function () {});
    Area.create({name: 'San Francisco Zoo', x:5, y:1, level:level.id}).exec(function () {});
    Area.create({name: 'Little Italy', x:5, y:2, level:level.id}).exec(function () {});
    Area.create({name: 'Fisherman\'s Wharf', x:5, y:3, level:level.id}).exec(function () {});
    Area.create({name: 'Twin Peaks', x:5, y:4, level:level.id}).exec(function () {});
    Area.create({name: 'Castro Street', x:5, y:5, level:level.id}).exec(function () {});
  });
}