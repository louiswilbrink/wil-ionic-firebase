angular.module('controllers.testButton', [])
.controller('TestButtonCtrl', function($scope, Db) {

  $scope.createUser = Db.createUser;

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

