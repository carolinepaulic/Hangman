(function() {
  function Directive() {
    function Controller(ThemeService) {
      var ctrl = this;

      ctrl.getTheme = function() {
        return ThemeService.getSelectedTheme();
      };
    }

    return {
      restrict: 'A',
      templateUrl: 'modules/game/letter-guess-box.html',
      controller: ['ThemeService', Controller],
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
