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
            console.info("Winner!");
            ctrl.userWon = true;
            // $state.go('welcome');
          }
        }
        else {
          ctrl.numWrongGuesses++;
          ctrl.hangmanImagePaths = HangmanFigureService.getHangmanImagePaths(ctrl.numWrongGuesses);
          if (ctrl.numWrongGuesses >= ctrl.numAllowedWrongGuesses) {
            console.info("Game over!");
            ctrl.userWon = false;
            // $state.go('welcome');
          }
        }
      }
    };

    function getRandomWord() {
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
