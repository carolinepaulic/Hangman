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
