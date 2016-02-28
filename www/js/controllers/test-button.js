angular.module('controllers.testButton', [])
.controller('TestButtonCtrl', function($scope, Db) {
  console.log(Db);

  $scope.createUser = Db.createUser;
});

