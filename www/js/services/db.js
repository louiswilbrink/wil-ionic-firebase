(function () {
'use strict'

angular.module('services.db', ['firebase'])
  .service('Db', DbService);

  DbService.$inject = ['$firebaseAuth', '$firebaseObject', '$q', '$timeout'];

  function DbService ($firebaseAuth, $firebaseObject, $q, $timeout) {

    // Create firebase reference to endpoint, then create authentication
    // reference.
    var ref = new Firebase('https://introgo-prod.firebaseio.com/');
    var auth = $firebaseAuth(ref);

    return {
      createUser: function () {

        auth.$createUser({
          email: 'lw@lw.com',
          password: 'lw'
        }).then(function(userData) {
          console.log("User " + userData.uid + " created successfully!");

          // Log in.

          auth.$authWithPassword({
            email: 'lw@lw.com',
            password: 'lw'
          }).then(function (authData) {
            console.log('logged in (authData)', authData);
            
            // Create user reference using uid.
            var user = new Firebase('https://introgo-prod.firebaseio.com/users/' + userData.uid);

            // Add user to db.
            user.set({
              firstName: 'Louis',
              lastName: 'Wilbrink',
              phone: '1234567890',
              uuid: 'asdf1234poiu0987',
              email: 'lw@lw.com',
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
                console.log('Success');
              }
              else {
                console.log('Error adding new user');
              }
            });
          }).catch(function (error) {
            console.log('Error logging in', error);
          });

        })
        .catch(function (error) {
          console.log('error creating user', error);
        });
      },
      logout: function () {
        return ref.unauth();
      }
    };
  };
})();
