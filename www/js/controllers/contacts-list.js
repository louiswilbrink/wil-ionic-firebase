angular.module('controllers.contactsList', [])
.controller('ContactsListCtrl', function($scope, $ionicPlatform, Contacts, 
  Introduction, contacts) {

  $scope.contactsList = [
    { name: 'Bob', phoneNumber: 15551234 },
    { name: 'Gretchen', phoneNumber: 15551234 },
    { name: 'Sally', phoneNumber: 15551234 },
    { name: 'Amos', phoneNumber: 15551234 }
  ];

  console.log(contacts);

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

  angular.forEach(contacts, function (contact, index) {
    $scope.contactsList.push({
      name: contact.name.formatted, 
      phoneNumber: getMobileNumber(contact.phoneNumbers)
    });
  });

  $scope.addContact = Introduction.addContact;

  //$ionicPlatform.ready(function(){
    //console.log('ionicPlatform ready!');
  //});

  $scope.getContacts = function () {
    console.log('delete this');
  }
});

