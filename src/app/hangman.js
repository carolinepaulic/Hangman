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
  function Controller($state, HangmanFigureService, WordService) {
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
            ctrl.userWon = true;
            // $state.go('welcome');
          }
        }
        else {
          ctrl.numWrongGuesses++;
          ctrl.hangmanImagePaths = HangmanFigureService.getHangmanImagePaths(ctrl.numWrongGuesses);
          if (ctrl.numWrongGuesses >= ctrl.numAllowedWrongGuesses) {
            ctrl.userWon = false;
            // $state.go('welcome');
          }
        }
      }
    };

    function getRandomWord() {
      ctrl.loadingWord = true;
      WordService.getRandomWord().then(function(result) {
        if (result.data.word) {
          var answerWord = result.data.word.toUpperCase();
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
        ctrl.loadingWord = false;
      });
    }

    ctrl.startNewGame = function() {
      ctrl.numWrongGuesses = 0;
      ctrl.userWon = null;
      ctrl.hangmanImagePaths = [];
      if (!ctrl.selectedLevel) {
        //TODO: prompt user for difficulty level
        ctrl.selectedLevel = ctrl.difficultyLevels.easy;
      }

      var alphabet = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];
      ctrl.alphabet = [];
      for (var i = 0; i < alphabet.length; i++) {
        ctrl.alphabet[i] = {
          letter: alphabet[i],
          guessed: false
        };
      }

      getRandomWord();
    };

    function init() {
      ctrl.selectedLevel = null;
      ctrl.numAllowedWrongGuesses = HangmanFigureService.getMaxAllowedWrongGuesses();
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

      ctrl.startNewGame();
    }

    init();
  }

  angular
    .module('hangman.game-module')
    .controller('GameController', ['$state', 'HangmanFigureService', 'WordService', Controller]);
})();

(function() {
  function Service() {
    var imagesPath = "resources/images/";
    var headPath = imagesPath + "zombie_head_transparent_background.png";
    var torsoPath = imagesPath + "zombie_torso_transparent_background.png";
    var legsPath = imagesPath + "zombie_pants_transparent_background.png";
    var shoesPath = imagesPath + "zombie_shoes_transparent_background.png";
    var bodyPartsPaths = [headPath, torsoPath, legsPath, shoesPath];

    this.getHangmanImagePaths = function(numWrongGuesses) {
      var hangmanPaths = [];
      for (var i = 0; i < numWrongGuesses && i < bodyPartsPaths.length; i++) {
        hangmanPaths.push(bodyPartsPaths[i]);
      }
      return hangmanPaths;
    };

    this.getMaxAllowedWrongGuesses = function() {
      return bodyPartsPaths.length;
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
  function Service() {
    this.THEMES = {
      zombie: "zombie"
    };
    this.DEFAULT_THEME = this.THEMES.zombie;

    this.getSelectedTheme = function() {
      return this.selectedTheme;
    };

    this.selectTheme = function(themeToSelect) {
      if (themeToSelect) {
        this.selectedTheme = themeToSelect;
      }
      else {
        this.selectedTheme = this.DEFAULT_THEME;
      }
    };

    this.selectTheme();
  }

  angular
  .module('hangman.game-module')
  .service('ThemeService', [Service]);
})();

(function() {
  function Service($http) {
    this.getRandomWord = function() {
      return $http.get('http://dictionary.jgefroh.com/word')
        .then(function(data) {
          return data;
        })
        .catch(function() {
          return {
            data: {
              word: 'effervescence'
            }
          };
        });
    };
  }

  angular
    .module('hangman.game-module')
    .service('WordService', ['$http', Service]);
})();

(function() {
  function Controller() {
    var ctrl = this;
  }

  angular.module('hangman.welcome-module')
    .controller('WelcomeController', [Controller]);
})();

angular
  .module('hangman', [
    'ui.router',
    'hangman.welcome-module',
    'hangman.game-module'
  ])
  .controller('ApplicationController', ['ThemeService', function(ThemeService) {
    var ctrl = this;

    ctrl.getTheme = function() {
      return ThemeService.getSelectedTheme();
    };
  }]);
