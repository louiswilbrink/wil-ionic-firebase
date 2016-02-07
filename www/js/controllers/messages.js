angular.module('controllers.messages', [])
.controller('MessagesCtrl', function($scope, Messages, Introduction) {

  $scope.messages = Messages.messages;
  $scope.introductees = Introduction.introductees;
  $scope.compose = Introduction.compose;
});

