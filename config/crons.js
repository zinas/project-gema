module.exports.crons = {
  '* * * * *': function(){
    Area.fillAll();
  }
};