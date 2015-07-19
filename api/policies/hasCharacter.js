module.exports = function (req, res, next) {
  Character.findOnePopulated({user: req.user.id}).then(function (character) {
    if ( !character ) {
      return res.redirect('/game/createCharacter');
    }
    if ( !character.online ) {
      Character.update({id: character.id}, {online: true}).then(function () {});
      character.online = true;
    }
    character.stats = Statistics.generate(character);
    res.locals.character = character;
    next();
  });
}