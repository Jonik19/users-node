(function () {
  'use strict';

  angular
    .module('App')
    .controller('SignInCtrl', SignInCtrl);

  SignInCtrl.$inject = ['api', '$location', 'user'];


  function SignInCtrl(api, $location, user) {
    var vm = this;

    vm.user = {};

    vm.signIn = function (username, password) {
      api.signIn(vm.user).then(function (response) {
        if(response && response.user) {
          user.load();
          $location.url('/users');
        }
      });
    };
  };

})();