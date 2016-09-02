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
