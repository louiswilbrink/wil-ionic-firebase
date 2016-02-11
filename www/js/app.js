// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('intro', ['ionic', 'controllers.contactsList', 
    'controllers.messages', 'controllers.appCtrl', 'controllers.playlist', 
    'controllers.confirmation', 'services.introduction', 'services.contacts', 
    'services.messages', 'services.dummy', 'services.compose', 'ngCordova', 
    'LocalStorageModule', 'filters.populate'])

.run(function($ionicPlatform) {

  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider, localStorageServiceProvider) {
  localStorageServiceProvider.setPrefix('introgo');

  $stateProvider
  .state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'templates/menu.html',
    controller: 'AppCtrl'
  })

  .state('app.confirmation', {
    url: '/confirmation',
    views: {
      'menuContent': {
        templateUrl: 'templates/confirmation.html',
        controller: 'ConfirmationCtrl',
        resolve: {
          introduction: function (Introduction, $state) {
            var introduction = {
              introductees: Introduction.introductees,
              message: Introduction.message
            }

            return introduction;
          }
        }
      }
    }
  })
  .state('app.messages', {
      url: '/messages',
      views: {
        'menuContent': {
          templateUrl: 'templates/messages.html',
          controller: 'MessagesCtrl',
          // For testing only, remove for production.
          resolve: {
            introductees: function (Contacts, Introduction) {
              var contacts = Contacts.loadTestContacts();
              Introduction.addContact(contacts[0]);
              Introduction.addContact(contacts[1]);
              return 0;
            }
          }
        }
      }
    })
  .state('app.contactsList', {
    url: '/contacts-list',
    views: {
      'menuContent': {
        templateUrl: 'templates/contacts-list.html',
        controller: 'ContactsListCtrl',
        resolve: {
          contacts: function (Contacts, $q, $timeout, $ionicPlatform) {
            Contacts.clear();
            var deferred = $q.defer();

            $ionicPlatform.ready(function () {

              // Provide contacts - if not on a phone, load test data.
              if (ionic.Platform.isIOS()) {
                deferred.resolve(Contacts.loadContacts());
              }
              else {
                deferred.resolve(Contacts.loadTestContacts());
              }
            });

            return deferred.promise;
          }
        }
      }
    }
  })
  .state('app.single', {
    url: '/playlists/:playlistId',
    views: {
      'menuContent': {
        templateUrl: 'templates/playlist.html',
        controller: 'PlaylistCtrl'
      }
    }
  });
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/contacts-list');
});
