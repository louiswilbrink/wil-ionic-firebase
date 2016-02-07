(function () {
'use strict'

angular.module('services.introduction', [])
  .service('Introduction', IntroductionService);

  IntroductionService.$inject = ['Contacts'];

  function IntroductionService (Contacts) {

    var message, introductees = []

    return {
      init: function () {
        console.log('init');
      },
      introductees: introductees,
      addContact: function (contact) {
        // If the contact was already selected, don't do anything.
        if (contact.isSelected) {
          return;
        }

        // Add contact as a introductee and set their selected status.
        introductees.push(contact);
        Contacts.select(contact);
      },
      removeContact: function (contact) {
        // Search for this contact in introductees.  Match by phone number.
        angular.forEach(introductees, function (introductee, index) {
          if (introductee.phone === contact.phone) {
            introductees.splice(index, 1);
          }
        });

        Contacts.deselect(contact);
      },
      clear: function () {
        console.log('clear connections and message');
      },
      compose: function () {
        console.log('inserting names into custom message');
        message = 'hi Louis and Test, you should meet!';
        return message;
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
