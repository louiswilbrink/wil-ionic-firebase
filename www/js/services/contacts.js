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
      clear: function () {
        contacts.length = 0;
      },
      loadTestContacts: function () {
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
            "formatted": "Louis Wilbrink",
            "middleName": null,
            "familyName": "Wilbrink", 
            "honorificPrefix": null
          },
          "nickname": null, 
          "phoneNumbers":[{
            "value": "+1 (973) 768-1848",
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
      select: function (selectedContact) {
        angular.forEach(contacts, function (contact) {
          if (contact.phone === selectedContact.phone) {
            contact.isSelected = true;
          }
        });
      },
      deselect: function (deselectedContact) {
        angular.forEach(contacts, function (contact) {
          if (contact.phone === deselectedContact.phone) {
            contact.isSelected = false;
          }
        });
      },
      loadContacts: function () {
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
