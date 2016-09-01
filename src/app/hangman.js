angular
  .module('hangman.game-module', [])
  .config(function($stateProvider) {
    $stateProvider.state('game', {
      url: '/play',
      templateUrl: 'modules/game/game.html',
      controller: 'GameController',
      controllerAs: 'ctrl'
    });
  });

angular
  .module('hangman.welcome-module', [])
  .config(function($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/');
    $stateProvider.state('welcome', {
      url: '/',
      templateUrl: 'modules/welcome/welcome.html',
      controller: 'WelcomeController',
      controllerAs: 'ctrl'
    });
  });

(function() {
  function Controller() {
    var ctrl = this;
  }

  angular.module('hangman.game-module')
    .controller('GameController', [Controller]);
})();

(function() {
  function Controller() {
    var ctrl = this;
  }

  angular.module('hangman.welcome-module')
    .controller('WelcomeController', [Controller]);
})();

angular.module('hangman', [
  'ui.router',
  'hangman.welcome-module',
  'hangman.game-module'
]);
