(function () {
'use strict'

angular.module('services.contacts', [])
  .service('Contacts', contactsService);

  contactsService.$inject = ['localStorageService', '$cordovaContacts'];

  function contactsService (localStorageService, $cordovaContacts) {

    var contacts = [];

    function searchByNumberType (phoneNumbers, type) {

      var mobileNumber;

      angular.forEach(phoneNumbers, function (phoneNumber) {
        if (phoneNumber.type === type) {
          mobileNumber = phoneNumber.value;
        }
      });

      return mobileNumber;
    }

    function getMobileNumber (phoneNumbers) {

      var mobileNumber;

      mobileNumber = searchByNumberType(phoneNumbers, 'mobile');

      if (!mobileNumber) {
        mobileNumber = searchByNumberType(phoneNumbers, 'home');
      }

      if (!mobileNumber) {
        mobileNumber = searchByNumberType(phoneNumbers, 'work');
      }

      return mobileNumber;
    }

    function simplifyContacts (iosContacts) {
      angular.forEach(iosContacts, function (contact, index) {
        contacts.push({
          name: contact.name.formatted,
          phone: getMobileNumber(contact.phoneNumbers),
          photos: contact.photos
        });
      });
    }

    return {
      init: function () {
        console.log('Hey!');
      },
      getTestContacts: function () {
        var testContacts = [{
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
        }, {
          "id": 401,
          "rawId": null,
          "displayName": null,
          "name": {
            "givenName": "Louis",
            "honorificSuffix": null,
            "formatted": "Louis Test 2",
            "middleName": null,
            "familyName": "Test 2", 
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
        }];

        simplifyContacts(testContacts);

        return contacts;
      },
      getContacts: function () {
        var options = {};
        options.multiple = true;

        function onSuccess(iosContacts) {
          localStorageService.set('contacts', contacts);
          simplifyContacts(iosContacts);
          return contacts;
        }

        function onError (error) {
          return error;
        }

        return $cordovaContacts.find({ multiple: true}).then(onSuccess, onError);
      },
      getPhotoUrl: function (contactId) {
        return 'photoUrl';
      }
    }
  };
})();
