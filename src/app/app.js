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
