(function () {
  'use strict';

  angular
    .module('App')
    .controller('ErrorsCtrl', ErrorsCtrl);

  ErrorsCtrl.$inject = ['errors'];


  function ErrorsCtrl(errors) {
    var vm = this;

    vm.list = errors.list;
  };

})();