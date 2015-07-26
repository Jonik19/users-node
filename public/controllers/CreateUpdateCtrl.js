(function () {
  'use strict';

  angular
    .module('App')
    .controller('CreateUpdateCtrl', CreateUpdateCtrl);

  CreateUpdateCtrl.$inject = ['$route', 'api', '$location'];


  function CreateUpdateCtrl($route, api, $location) {
    var id = $route.current.params.id;

    var vm = this;

    if(id) {
      api.getUser(id).then(function (response) {
        vm.user = response.user;
      });
    } else {
      vm.user = {};
    }

    vm.action = (id) ? 'Сохранить' : 'Создать';

    vm.createUpdate = function (data) {
      if(id)
        api.updateUser(data).then(onCreateUpdate);
      else 
        api.createUser(data).then(onCreateUpdate);
    };

    var onCreateUpdate = function (response) {
      if(response.user) {
        $location.url('/users');
      }
    }
  
  };


})();