module.exports = function () {
  Armor.create({
    name: 'Bulletproof vest',
    protection: 3
  }).exec(function () {});
}