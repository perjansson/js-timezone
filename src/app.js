(function() {
  'use strict';

  angular
    .module('jsTimeZoneApp', ['ui.bootstrap'])


    .controller('TimeController', function() {
      var vm = this;

      vm.datePicker = {
        opened: false,
        options: {
          formatYear: 'yy',
          startingDay: 1
        }
      }
      vm.open = function($event) {
        vm.datePicker.opened = true;
      };
      vm.epoch = 1452211200000;
      //vm.epoch = 1452124800000;
      vm.time = new Date();
      //vm.time.setMinutes(vm.time.getMinutes() - vm.time.getTimezoneOffset());
      vm.time.setHours(12,0,0,0);
      vm.timeZoneOffset = function() {
        return new Date().getTimezoneOffset();
      }

      vm.submit = function() {
        console.log(moment(vm.epoch).valueOf());
        console.log(moment.utc(vm.epoch).valueOf());

        console.log(moment(vm.time).valueOf());
        console.log(moment.utc(vm.time).valueOf());
      }
    })


    .directive('datepickerLocaldate', ['$parse', function($parse) {
      var directive = {
        restrict: 'A',
        require: ['ngModel'],
        link: link
      };
      return directive;

      function link(scope, element, attr, ctrls) {
        var ngModelController = ctrls[0];
        // called with a JavaScript Date object when picked from the datepicker
        ngModelController.$parsers.push(function(viewValue) {
          if (!viewValue) {
            return undefined;
          }
          // undo the timezone adjustment we did during the formatting
          //viewValue.setMinutes(viewValue.getMinutes() - viewValue.getTimezoneOffset());
          viewValue.setHours(12,0,0,0);
          // we want date in Unix timestamp
          return Math.round(new Date(viewValue).getTime());
        });
        // called with a Unix timestamp to format
        ngModelController.$formatters.push(function(modelValue) {
          if (!modelValue) {
            return undefined;
          }
          // date constructor will apply timezone deviations from UTC (i.e. if locale is behind UTC 'dt' will be one day behind)
          var dt = new Date(modelValue);
          // 'undo' the timezone offset again (so we end up on the original date again)
          //dt.setMinutes(dt.getMinutes() + dt.getTimezoneOffset());
          dt.setHours(12,0,0,0);
          return dt;
        });
      }
    }]);

})();
