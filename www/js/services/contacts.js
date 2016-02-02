(function () {
'use strict'

angular.module('services.contacts', [])
  .service('Contacts', contactsService);

  contactsService.$inject = [];

  function contactsService () {

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
            "givenName": "Alex",
            "honorificSuffix": null,
            "formatted": "Alex Konecky",
            "middleName": null,
            "familyName": "Konecky", 
            "honorificPrefix": null
          },
          "nickname": null, 
          "phoneNumbers":[{
            "value": "+1 (973) 368-5577",
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
        return [{
          "id": 201,
          "rawId": null,
          "displayName": null,
          "name": {
            "givenName": "Matt",
            "honorificSuffix": null,
            "formatted": "Matt Konecky",
            "middleName": null,
            "familyName": "Konecky", 
            "honorificPrefix": null
          },
          "nickname": null, 
          "phoneNumbers":[{
            "value": "+1 (973) 555-1234",
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
      getPhotoUrl: function (contactId) {
        return 'photoUrl';
      }
    }
  };
})();
