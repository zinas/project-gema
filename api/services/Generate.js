module.exports = function (obj) {
  return require('./generators/'+obj)();
};