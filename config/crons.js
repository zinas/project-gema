module.exports.crons = {
  '* * * * *': function(){
    Area.fillAll();
  },
  '*/5 * * * *': function(){
    Monster.clearStale();
  }

};