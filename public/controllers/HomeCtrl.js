(function () {
  'use strict';

  angular
    .module('App')
    .controller('HomeCtrl', HomeCtrl);

  HomeCtrl.$inject = [];


  function HomeCtrl() {
    var vm = this;

    vm.description = 'My description';
  };

})();