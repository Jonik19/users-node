(function () {
  'use strict';

  angular
    .module('App')
    .factory('authInterceptor', authInterceptor);

  authInterceptor.$inject = ['$location', '$q', 'errors'];


  function authInterceptor($location, $q, errors) {
    return {
      request: function (config) {
        return config;
      }, 
      response: function (response) {
        var errorsList;

        if(errorsList = response.data.errors) {
          errors.add(errorsList);
        }

        return response;
      },
      responseError: function(rejection) {
        var errorsList;

         if(rejection.status === 401) {
            if(errorsList = rejection.data.errors) {
              errors.add(errorsList);
            }
            $location.path('/sign-in');
         }
         return $q.reject(rejection);
       }
    }
  }

})();