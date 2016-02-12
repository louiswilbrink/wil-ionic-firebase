angular.module('controllers.messages', [])
.controller('MessagesCtrl', function($scope, Messages, Introduction, $state) {

  $scope.messages = Messages.messages;

  $scope.introductees = Introduction.introductees;

  $scope.compose = function (message) {
    Introduction.compose(message);
    $state.go('app.confirmation');
  };
});

