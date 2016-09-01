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
