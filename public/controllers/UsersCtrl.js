(function () {
  'use strict';

  angular
    .module('App')
    .controller('UsersCtrl', UsersCtrl);

  UsersCtrl.$inject = ['api'];


  function UsersCtrl(api) {
    var vm = this;

    vm.list = [];

    api.getUsers().then(function (response) {
      [].push.apply(vm.list, response.users);
    });

    vm.delete = function (id, user) {
      api.destroyUser(id).then(function (response) {
        vm.list.splice(vm.list.indexOf(user), 1);
      });
    };
  };

})();