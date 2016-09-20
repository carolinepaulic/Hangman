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
