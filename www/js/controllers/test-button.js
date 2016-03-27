angular.module('controllers.testButton', [])
.controller('TestButtonCtrl', function($scope, Db) {

  $scope.createUser = Db.createUser;
  $scope.logout     = Db.logout;

  $scope.getAuth = Db.getAuth;

  $scope.terminateAccount = function (email, password) {
    Db.terminateAccount(email, password).catch(function (error) {
      console.log('error terminating', error);
    });
  };

  $scope.login = function (email, password) {
    Db.login({
      email: email,
      password: password
    })
    .then(function (something) {
      console.log('Logged in', something);
    })
    .catch(function (error) {
      console.log('Error Logging In', error);
    });
  };
});

