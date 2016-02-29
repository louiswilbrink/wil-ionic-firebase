(function () {
'use strict'

angular.module('services.db', ['firebase'])
  .service('Db', DbService);

  DbService.$inject = ['$firebaseAuth', '$firebaseObject', '$q', '$timeout'];

  function DbService ($firebaseAuth, $firebaseObject, $q, $timeout) {

    /* PRIVATE VARIABLES */

    // Create firebase reference to endpoint, then create authentication
    // reference.
    var ref = new Firebase('https://introgo-prod.firebaseio.com/');
    var auth = $firebaseAuth(ref);

    /* PRIVATE METHODS */

    function addUser (userInfo) {

      var isUserAdded = $q.defer();

      // Create user reference using uid.
      var user = new Firebase('https://introgo-prod.firebaseio.com/users/' + userInfo.uid);

      // Add user to db.
      user.set({
        firstName: 'Louis',
        lastName: 'Wilbrink',
        phone: '1234567890',
        uuid: 'asdf1234poiu0987',
        email: userInfo.email,
        connections: [{
          introductees: [{ dummy: 'dummy' }],
          message: 'dummy message'
        }],
        customMessages: [
          'Hello ${p1} and ${p2}, you guy\'s should meet',
          '${p1}, meet ${p2}'
        ]
      }, function (error) {
        if (!error) {
          isUserAdded.resolve(true);
        }
        else {
          isUserAdded.reject(error);
        }
      });

      return isUserAdded.promise;
    }

    function getLoginInfo (authData) {
      return $q.when({
        uid: authData.uid,
        email: authData.password.email
      });
    }

    /* PUBLIC METHODS */

    function login (credentials) {
      return auth.$authWithPassword({
        email: credentials.email,
        password: credentials.password
      })
    }

    function createUser (email, password) {
      var credentials = {
        email: email,
        password: password
      };

      auth.$createUser(credentials)
      .then(function passCredentials (userData) {
        return $q.when(credentials);
      })
      .then(login)        // receives credentials.
      .then(getLoginInfo) // receives authData.
      .then(addUser)      // receives userInfo.
      .catch(function (error) {
        console.log('Error Creating User:', error);
      });
    }

    return {
      createUser: createUser,
      login: login,
      removeUser: null,
      addIntroduction: null,
      updateFirstName: null,
      updateLastName: null,
      updatePhone: null,
      updateEmail: null,
      logout: function () {
        return ref.unauth();
      }
    };
  };
})();
