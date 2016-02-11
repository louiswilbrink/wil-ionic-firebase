angular.module('controllers.confirmation', [])
.controller('ConfirmationCtrl', function($scope, $state, introduction) {

  // Redirect if missing introductees or message.
  if (introduction.introductees.length === 0) {

    // If no introductees, go to contacts page.
    $state.go('app.contactsList');

  } else if (!introduction.message) {

    // If no message defined, go to messages page.
    $state.go('app.messages');

  }

  $scope.introduction = introduction;

});
