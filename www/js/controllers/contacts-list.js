angular.module('controllers.contactsList', [])
.controller('ContactsListCtrl', function($scope, Introduction, contacts) {

  $scope.contacts = contacts;

  $scope.addContact = Introduction.addContact;
});

