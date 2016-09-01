angular
  .module('hangman.game-module', [])
  .config(function($stateProvider) {
    $stateProvider.state('game', {
      url: '/play',
      templateUrl: 'modules/game/game.html',
      controller: 'GameController',
      controllerAs: 'ctrl'
    });
  });

angular
  .module('hangman.welcome-module', [])
  .config(function($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/');
    $stateProvider.state('welcome', {
      url: '/',
      templateUrl: 'modules/welcome/welcome.html',
      controller: 'WelcomeController',
      controllerAs: 'ctrl'
    });
  });

(function() {
  function Controller($state, HangmanFigureService) {
    var ctrl = this;

    ctrl.guessLetter = function(letter) {
      if (!letter.guessed) {
        letter.guessed = true;
        var correctGuess = false;
        angular.forEach(ctrl.answer, function(answerLetter) {
          if (answerLetter === letter) {
            correctGuess = true;
            return;
          }
        });
        if (correctGuess) {
          var allLettersGuessed = true;
          angular.forEach(ctrl.answer, function(answerLetter) {
            if (!answerLetter.guessed) {
              allLettersGuessed = false;
            }
          });
          if (allLettersGuessed) {
            console.info("Winner!");
            // $state.go('welcome');
          }
        }
        else {
          ctrl.numWrongGuesses++;
          ctrl.figure = HangmanFigureService.getHangmanFigure(ctrl.numWrongGuesses);
          if (ctrl.numWrongGuesses >= ctrl.numAllowedWrongGuesses) {
            console.info("Game over!");
            // $state.go('welcome');
          }
        }
      }
    };

    function getRandomWord() {
      //TODO
      return "Banana";
    }

    function startNewGame() {
      if (!ctrl.selectedLevel) {
        ctrl.numWrongGuesses = 0;
        //TODO: prompt user for difficulty level
        ctrl.selectedLevel = ctrl.difficultyLevels.easy;
        ctrl.showLetter = true;


        var alphabet = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];
        ctrl.alphabet = [];
        for (var i = 0; i < alphabet.length; i++) {
          ctrl.alphabet[i] = {
            letter: alphabet[i],
            guessed: false
          };
        }

        var answerWord = getRandomWord().toUpperCase();
        ctrl.answer = [];
        angular.forEach(answerWord, function(answerLetter) {
          angular.forEach(ctrl.alphabet, function(alphabetLetter) {
            if (alphabetLetter.letter == answerLetter) {
              ctrl.answer.push(alphabetLetter);
              return;
            }
          });
        });

      }
    }

    function init() {
      ctrl.selectedLevel = null;
      ctrl.numAllowedWrongGuesses = 5;
      ctrl.difficultyLevels = {
        easy: {
          minLetters: 2,
          maxLetters: 4
        },
        medium: {
          minLetters: 4,
          maxLetters: 6
        },
        hard: {
          minLetters: 6,
          maxLetters: 8
        }
      };

      startNewGame();
    }

    init();
  }

  angular
    .module('hangman.game-module')
    .controller('GameController', ['$state', 'HangmanFigureService', Controller]);
})();

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

(function() {
  function Directive() {
    function Controller() {
      var ctrl = this;
    }

    return {
      restrict: 'A',
      templateUrl: 'modules/game/letter-guess-box.html',
      controller: [Controller],
      controllerAs: 'ctrl',
      bindToController: true,
      scope : {
        letter: '@',
        showLetter: '='
      }
    };
  }


  angular
  .module('hangman.game-module')
  .directive('letterGuessBox', Directive);
})();

(function() {
  function Controller() {
    var ctrl = this;
  }

  angular.module('hangman.welcome-module')
    .controller('WelcomeController', [Controller]);
})();

angular.module('hangman', [
  'ui.router',
  'hangman.welcome-module',
  'hangman.game-module'
]);
