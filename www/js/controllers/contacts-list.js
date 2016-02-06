angular.module('controllers.contactsList', [])
.controller('ContactsListCtrl', function($scope, Introduction, contacts) {

  $scope.contacts = contacts;
  $scope.introductees = Introduction.introductees;

  $scope.addContact = Introduction.addContact;
  $scope.removeContact = Introduction.removeContact;

});

