(function () {
  'use strict';

  angular
    .module('App')
    .factory('api', api);

  api.$inject = ['$http', '$q'];


  function api($http, $q) {
    var factory = {};

    factory.signIn = function (options) {
      var deffered = $q.defer();

      var username = options.username;
      var password = options.password;

      $http({
        method: 'POST',
        url: '/sign-in',
        data: options
      }).then(function (response) {
        console.log(response);
        deffered.resolve(response.data);
      });

      return deffered.promise;
    };

    factory.signUp = function (options) {
      var deffered = $q.defer();

      var username = options.username;
      var password = options.password;
      var first_name = options.first_name;
      var age = options.age;

      $http({
        method: 'POST',
        url: '/sign-up',
        data: options
      }).then(function (response) {
          deffered.resolve(response.data);
      });

      return deffered.promise;
    };

    factory.signOut = function () {
      var deffered = $q.defer();

      $http({
        method: 'POST',
        url: '/sign-out'
      }).then(function (response) {
          deffered.resolve(response.data);
      });

      return deffered.promise;
    };

    factory.getUsers = function (options) {
      var deffered = $q.defer();

      $http({
        method: 'GET',
        url: '/users',
        data: options
      }).then(function (response) {
          deffered.resolve(response.data);
      });

      return deffered.promise;
    };

    factory.getUser = function (id) {
      var deffered = $q.defer();

      $http({
        method: 'GET',
        url: '/users/'+id
      }).then(function (response) {
          deffered.resolve(response.data);
      });

      return deffered.promise;
    };

    factory.createUser = function (options) {
      var deffered = $q.defer();

      $http({
        method: 'POST',
        url: '/users',
        data: options,
        
      }).then(function (response) {
          deffered.resolve(response.data);
      });

      return deffered.promise;
    };

    factory.updateUser = function (options) {
      var deffered = $q.defer();

      $http({
        method: 'PUT',
        url: '/users/'+options.id,
        data: options,

      }).then(function (response) {
          deffered.resolve(response.data);
      });

      return deffered.promise;
    };

    factory.destroyUser = function (id) {
      var deffered = $q.defer();

      $http({
        method: 'DELETE',
        url: '/users/'+id
      }).then(function (response) {
          deffered.resolve(response.data);
      });

      return deffered.promise;
    };

    factory.checkAuth = function () {
      var deffered = $q.defer();

      $http({
        method: 'POST',
        url: '/check'
      }).then(function (response) {
        deffered.resolve(response.data);
      });

      return deffered.promise;
    };

    return factory;
  };

})();