(function() {
  'use strict';

  angular
    .module('jsTimeZoneApp', ['ui.bootstrap'])
    .controller('TimeController', function() {
      var vm = this;

      //vm.epoch = 1452121200000;
      vm.epoch = 1452124800000;
      vm.time = new Date(vm.epoch);
      vm.timeZoneOffset = function() {
        return new Date().getTimezoneOffset();
      }

      vm.submit = function() {
        console.log(moment(vm.epoch).valueOf());
        console.log(moment.utc(vm.epoch).valueOf());
        console.log(moment(vm.time).valueOf());
        console.log(moment.utc(vm.time).valueOf());
      }
    });

})();
