(function () {
'use strict'

angular.module('intro.services', [])
  .service('Contacts', contactsService);

  contactsService.$inject = [];

  function contactsService () {

    return {
      init: function () {
        console.log('Hey!');
      },
      getContacts: function () {
        return [{
          address: [{
            postalCode: '94010',
            region: 'CA',
            streetAddress: '165 Davis Street',
            type: 'work'
          }],
          name: {
            familyName: 'Bell',
            formattedName: 'Kate Bell',
            givenName: 'Kate'
          },
          nickname: 'Kate-dawg',
          birthday: 254145600000,
          emails: [{
            type: 'work',
            value: 'kate-bell@mac.com',
            pref: false,
            id: 0
          },{
            type: 'work',
            value: 'www.icloud.com',
            pref: false,
            id: 1
          }]
        }]
      }
    }
  };
})();
