module.exports = function () {
  ArmorTemplate.create({
    name: 'Bulletproof vest',
    description: 'A vest that used to be used by police when raiding dangerous premises.',
    value: 5000,
    level: 5,
    protection: 3
  }).exec(function () {});
}