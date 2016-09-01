angular.module('hangman.game-module', []);

angular.module('hangman.welcome-module', []);



angular.module('hangman', [
  'hangman.welcome-module',
  'hangman.game-module'
]);
