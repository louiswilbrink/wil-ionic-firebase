(function () {
'use strict'

angular.module('services.contacts', [])
  .service('Contacts', contactsService);

  contactsService.$inject = ['localStorageService', '$cordovaContacts'];

  function contactsService (localStorageService, $cordovaContacts) {

    return {
      init: function () {
        console.log('Hey!');
      },
      getTestContacts: function () {
        return [{
          "id": 201,
          "rawId": null,
          "displayName": null,
          "name": {
            "givenName": "Louis",
            "honorificSuffix": null,
            "formatted": "Louis Test",
            "middleName": null,
            "familyName": "Test", 
            "honorificPrefix": null
          },
          "nickname": null, 
          "phoneNumbers":[{
            "value": "+1 (720) 295-1791",
            "pref": false,
            "id": 0, 
            "type": "mobile"
          }],
          "emails": null,
          "addresses": null,
          "ims": null, 
          "organizations": null,
          "birthday": null,
          "note": null,
          "photos": null, 
          "categories": null,
          "urls": null
        }]
      },
      getContacts: function () {
        var options = {};
        options.multiple = true;

        function onSuccess(contacts) {
          localStorageService.set('contacts', contacts);
          return contacts;
        }

        function onError (error) {
          return error;
        }

        return $cordovaContacts.find(options).then(onSuccess, onError);
      },
      getPhotoUrl: function (contactId) {
        return 'photoUrl';
      }
    }
  };
})();
