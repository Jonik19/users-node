(function () {
  'use strict';

  angular
    .module('App')
    .factory('user', user);

  user.$inject = ['$http', '$q', 'api'];


  function user($http, $q, api) {
    var factory = {};

    var user = {};
    var isAuth = false;

    factory.get = function () {
      return user;
    };

    factory.load = function () {
      var deffered = $q.defer();

      api.checkAuth().then(function (response) {
        var user = response.user;

        console.log(user);
        
        if(!user) {
          isAuth = false;
          factory.set({});
          deffered.resolve(factory.get());
        }

        if(user) {
          isAuth = true;
          factory.set(user);
          deffered.resolve(factory.get());
        }

      });

      return deffered.promise;
    };

    factory.set = function (val) {
      angular.copy(val, user);
    };

    factory.isAuth = function () {
      return isAuth;
    };

    return factory;
  };

})();