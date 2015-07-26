(function () {
  'use strict';

  angular
    .module('App')
    .controller('SignUpCtrl', SignUpCtrl);

  SignUpCtrl.$inject = ['api', 'user', '$location'];


  function SignUpCtrl(api, user, $location) {
    var vm = this;

    vm.user = {};

    vm.createUpdate = function (data) {
      api.signUp(data).then(function (response) {
        if(response && response.user) {
          user.load();
          $location.url('/users');
        }
      });
    };

    vm.action = 'Зарегистрироваться';
  };

})();