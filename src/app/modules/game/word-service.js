(function() {
  function Service($http) {
    this.getRandomWord = function() {
      return $http.get('/randomWord');
    };
  }

  angular
    .module('hangman.game-module')
    .service('WordService', ['$http', Service]);
})();
