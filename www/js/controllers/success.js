angular.module('controllers.success', [])
.controller('SuccessCtrl', ['$scope', '$state', 'Introduction', function ($scope, $state, Introduction) {
  
  $scope.$on('$ionicView.beforeEnter', function () {
    console.log('SuccessCtrl');

    $scope.introductees = Introduction.introductees;

    $scope.navigate = function (state) {
      $state.go(state);
    };
  });
}]);
