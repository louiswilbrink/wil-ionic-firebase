(function () {
'use strict'

angular.module('services.introduction', [])
  .service('Introduction', IntroductionService);

  IntroductionService.$inject = [];

  function IntroductionService () {

    var people = [],
        message = '';

    return {
      init: function () {
        console.log('init');
      },
      addContact: function (contact) {
        console.log(contact);
        console.log('adding contact name/photo/number to introduction');
        people.push(contact);
        console.log(people);
      },
      clear: function () {
        console.log('clear connections and message');
      },
      compose: function () {
        console.log('inserting names into custom message');
      },
      send: function () {
        $cordovaSms.send('9737681848', 'Hey this is working!', {})
          .then(function() {
            console.log('sent!');
          }, function(error) {
            console.log(error);
          });
      }
    }
  };
})();
