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
    var isAuth = false;
    
    // User variables.
    var uid, email;

    auth.$onAuth(function (authData) {
      console.log('Auth State Change:', authData);

      if (!authData) {
        isAuth = false;
      }
      else if (authData.uid) {
        isAuth = true;
      }
    });

    /* PRIVATE METHODS */

    function addUser (userInfo) {

      var isUserAdded = $q.defer();

      // Create user reference using uid.
      var userRef = new Firebase('https://introgo-prod.firebaseio.com/users/' + userInfo.uid);

      // Add user to db.
      userRef.set({
        firstName: 'Louis',
        lastName: 'Wilbrink',
        phone: '1234567890',
        uuid: 'asdf1234poiu0987',
        email: userInfo.email,
        introductions: [{
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
      uid = authData.uid;
      email = authData.password.email;

      return $q.when({
        uid: uid,
        email: email
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

    function checkPassword (password) {
      //return auth.$getAuth().then(function authData)
    }

    // Remove the user object from firebase db.
    function removeUser (authData) {

      // Create user reference using uid.
      var userRef = new Firebase('https://introgo-prod.firebaseio.com/users/' + authData.uid);
      var user = $firebaseObject(userRef);

      return user.$remove().then(function () {
        user.$destroy(); // removes listeners (which also respond to auth changes).
      }); 
    }

    function terminateAccount (email, password) {

      return login({ // Check credentials.
        email: email, 
        password: password
      })
      .then(removeUser)  // Receives authData.
      .then(function () {
        return auth.$removeUser({
          email: email,
          password: password
        });
      });
    }

    return {
      createUser: createUser,
      login: login,
      removeUser: removeUser,
      terminateAccount: terminateAccount,
      addIntroduction: null,
      updateFirstName: null,
      updateLastName: null,
      updatePhone: null,
      updateEmail: null,
      getUid: function () {
        return uid;
      },
      getEmail: function () {
        return email;
      },
      getAuth: function () {
        var authData = auth.$getAuth();
        console.log(authData);
      },
      isAuth: function () {
        return isAuth;
      },
      logout: function () {
        return ref.unauth();
      }
    };
  };
})();
