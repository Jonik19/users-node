(function () {
  'use strict';

  angular
    .module('App', ['ngRoute', 'infinite-scroll'])
    .config(Config)
    .run(Run);

  Config.$inject = ['$routeProvider', '$httpProvider', 'errorsProvider'];
  Run.$inject = ['$rootScope', 'user'];


  function Config($routeProvider, $httpProvider, errorsProvider) {
      $routeProvider
        .when('/', {
          controller: 'HomeCtrl',
          controllerAs: 'home',
          templateUrl: 'templates/HomePage.html'
        })
        .when('/sign-in', {
          controller: 'SignInCtrl',
          controllerAs: 'signIn',
          templateUrl: 'templates/SignInPage.html'
        })
        .when('/sign-up', {
          controller: 'SignUpCtrl',
          controllerAs: 'vm',
          templateUrl: 'templates/CreateUpdatePage.html'
        })
        .when('/users', {
          controller: 'UsersCtrl',
          controllerAs: 'users',
          templateUrl: 'templates/UsersPage.html'
        })
        .when('/users/edit/:id', {
          controller: 'CreateUpdateCtrl',
          controllerAs: 'vm',
          templateUrl: 'templates/CreateUpdatePage.html'
        })
        .when('/users/create', {
          controller: 'CreateUpdateCtrl',
          controllerAs: 'vm',
          templateUrl: 'templates/CreateUpdatePage.html'
        })
        .otherwise({
          redirectTo: '/'
        });

      errorsProvider.setDelay(2);

      $httpProvider.interceptors.push('authInterceptor');
  };

  function Run($rootScope, user) {
    user.load();

    $rootScope.$on('$routeChangeStart', function (event, next, prev) {
      //
    });

  };

})();