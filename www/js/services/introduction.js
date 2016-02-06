(function () {
'use strict'

angular.module('services.introduction', [])
  .service('Introduction', IntroductionService);

  IntroductionService.$inject = ['Contacts'];

  function IntroductionService (Contacts) {

    var introductees = [],
        message = '';

    return {
      init: function () {
        console.log('init');
      },
      introductees: introductees,
      addContact: function (contact) {
        introductees.push(contact);
      },
      removeContact: function (contact) {
        angular.forEach(introductees, function (introductee, index) {
          if (introductee.phone === contact.phone) {
            introductees.splice(index, 1);
          }
        });

        console.log(introductees);
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
