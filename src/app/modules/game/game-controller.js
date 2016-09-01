(function() {
  function Controller($state) {
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

  angular.module('hangman.game-module')
    .controller('GameController', ['$state', Controller]);
})();
