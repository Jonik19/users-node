(function () {
  'use strict';

  angular
    .module('App')
    .provider('errors', errors);

  errors.$inject = [];


  function errors() {
    var list = [];
    var delay = 1.5;

    return {
      $get: function () {
        var self = this;

        var factory = {};

        factory.list = list;

        factory.add = self.add;

        return factory;
      },
      add: function (errors) {
        var timeout;

        Array.prototype.push.apply(list, errors);

        for(var key in errors) {
          timeout = setTimeout(function () {
            list.splice(list.indexOf(errors[key]), 1);

            clearTimeout(timeout);
          }, delay);
        }
      },
      setDelay: function (val) {
        if(typeof val === 'number')
          delay = val;
      }
    };
  }

})();