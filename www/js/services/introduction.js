(function () {
'use strict'

angular.module('services.introduction', [])
  .service('Introduction', IntroductionService);

  IntroductionService.$inject = ['Contacts', 'Compose', '$cordovaSms', '$state'];

  function IntroductionService (Contacts, Compose, $cordovaSms, $state) {

    var message, introductees = []

    return {
      introductees: introductees,
      message: message,
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
        introductees.length = 0;
        message = '';
      },
      compose: function (unpopulatedMessage) {
        if (introductees.length === 0) {
          return; // No introductees exists.
        }

        this.message = Compose.message(unpopulatedMessage, introductees);
      },
      send: function () {
        var self = this,
            phoneNumbers = [];

        angular.forEach(self.introductees, function (introductee) {
          phoneNumbers.push(introductee.phone);
        });

        $cordovaSms.send(phoneNumbers, self.message, {})
          .then(function() {
            $state.go('app.success');
          }, function(error) {
            console.log(error);
          });
      }
    }
  };
})();
