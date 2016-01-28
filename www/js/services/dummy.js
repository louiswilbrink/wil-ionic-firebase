(function () {
'use strict'

angular.module('services.dummy', [])
  .service('Dummy', dummyService);

  dummyService.$inject = ['$timeout'];

  function dummyService ($timeout) {

    return {
      init: function () {
        console.log('initializing the dummy');
      },
      timeout: function ($timeout) {

        /* Not
         * Currently
         * working.
         */
        //$timeout(function () {
          //console.log('in timeout');
        //}, 1500);

        return { value: 'simple' };
      }
    }
  };
})();
