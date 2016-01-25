angular.module('intro.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  // Form data for the login modal
  $scope.loginData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };
})

.controller('ContactsListCtrl', function($scope, $cordovaContacts, $ionicPlatform, Contacts) {

  $scope.contactsList = [
    { name: 'Bob', phoneNumber: 15551234 },
    { name: 'Gretchen', phoneNumber: 15551234 },
    { name: 'Sally', phoneNumber: 15551234 },
    { name: 'Amos', phoneNumber: 15551234 }
  ];

  $scope.sendMessage = function (phoneNumber) {
    console.log('sending a message to ', phoneNumber);
  };

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
})

.controller('PlaylistCtrl', function($scope, $stateParams) {
  console.log('In PlaylistCtrl');
});
