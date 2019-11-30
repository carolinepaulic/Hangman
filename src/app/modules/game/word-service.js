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
