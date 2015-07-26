(function () {
  'use strict';

  angular
    .module('App')
    .controller('MenuCtrl', MenuCtrl);

  MenuCtrl.$inject = ['api', 'user'];


  function MenuCtrl(api, user) {
    var vm = this;

    vm.user = user;

    vm.signOut = function () {
      api.signOut().then(function () {
        user.load();
      });
    };

  };

})();