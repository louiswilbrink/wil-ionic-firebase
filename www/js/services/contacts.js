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
      contacts: contacts,
      testContacts: function () {
        return [{
          "id": 201,
          "rawId": null,
          "displayName": null,
          "name": {
            "givenName": "AA Xavier",
            "honorificSuffix": null,
            "formatted": "AA Xavier Fontaine",
            "middleName": null,
            "familyName": "Fontaine", 
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
            "givenName": "AA Louis",
            "honorificSuffix": null,
            "formatted": "AA Louis Wilbrink",
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
      },
      loadTestContacts: function () {
        var testContacts = this.testContacts();

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
        self = this;
        
        var options = {};
        options.multiple = true;

        function onSuccess(iosContacts) {
          localStorageService.set('contacts', contacts);

          var testContacts = self.testContacts();

          // Add test contacts.  REMOVE BEFORE PRODUCTION.
          angular.forEach(testContacts, function (testContact) {
            iosContacts.push(testContact);
          });

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
