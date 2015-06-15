module.exports = function (req, res, next) {
  Character.findOne({user: req.user.id}).populateAll().exec(function (err, character) {
    if ( character ) {
      return res.redirect('/game/explore');
    }
    next();
  });
}