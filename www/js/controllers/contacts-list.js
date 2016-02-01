angular.module('controllers.contactsList', [])
.controller('ContactsListCtrl', function($scope, $cordovaContacts, 
  $ionicPlatform, Contacts, Introduction, localStorageService) {

  $scope.contactsList = [
    { name: 'Bob', phoneNumber: 15551234 },
    { name: 'Gretchen', phoneNumber: 15551234 },
    { name: 'Sally', phoneNumber: 15551234 },
    { name: 'Amos', phoneNumber: 15551234 }
  ];

  $scope.addContact = Introduction.addContact;

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

  function onSuccess(contacts) {
    localStorageService.set('contacts', contacts);
    angular.forEach(contacts, function (contact, index) {
      $scope.contactsList.push({
        name: contact.name.formatted, 
        phoneNumber: getMobileNumber(contact.phoneNumbers)
      });
    });
  }

  function onError (error) {
    alert(error);
  }

  var options = {};
  options.multiple = true;

  $ionicPlatform.ready(function(){
    console.log('ionicPlatform ready!');
  });

  $scope.getContacts = function () {
    $cordovaContacts.find(options).then(onSuccess, onError);
  }
});

