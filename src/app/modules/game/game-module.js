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
