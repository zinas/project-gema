module.exports.crons = {
  '* * * * *': function(){
    Area.fillAll();
  },
  '*/5 * * * *': function(){
    console.log('clearing stale monsters');
    Monster.clearStale();
  }

};