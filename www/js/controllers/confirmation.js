angular.module('controllers.confirmation', [])
.controller('ConfirmationCtrl', function($scope, $state, Introduction) {
  
  $scope.$on('$ionicView.beforeEnter', function () {

    // Initialize $scope with Introduction information.
    $scope.introductees = Introduction.introductees;
    $scope.message = Introduction.message;

    // Redirect if missing introductees or message.
    if ($scope.introductees.length === 0) {

      // If no introductees, go to contacts page.
      $state.go('app.contactsList');

    } else if (!$scope.message) {

      // If no message defined, go to messages page.
      $state.go('app.messages');

    }

    $scope.sendIntroduction = Introduction.send;
  });

});
