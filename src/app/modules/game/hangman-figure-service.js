(function() {
  function Service() {
    var hat =   ["      *        ",
                 "   __/_\\__      "];
    var head =  ["  / x  x \\   ",
                 "  |          |    ",
                 "  |   o     |    ",
                 "  \\____/    "];
    var arms =  ["  ___|___/    ",
                 "/     ||       "];
    var torso = ["      ||       "];
    var legs =  ["     /\\     ",
                 " __/   \\__  ",
                 "8__]   [__8] "];
    var body = [hat, head, arms, torso, legs];
    this.getHangmanFigure = function(numWrongGuesses) {
      var figure = [];
      for (var i = 0; i < numWrongGuesses && i < body.length; i++) {
        for (var j = 0; j < body[i].length; j++) {
          figure.push(body[i][j]);
        }
      }
      return figure;
    };
  }

  angular
  .module('hangman.game-module')
  .service('HangmanFigureService', [Service]);
})();
