module.exports = function (req, res, next) {
  Character.findOnePopulated({user: req.user.id}).then(function (character) {
    if ( !character ) {
      return res.redirect('/game/createCharacter');
    }
    character.stats = Statistics.generate(character);
    res.locals.character = character;
    next();
  });
}