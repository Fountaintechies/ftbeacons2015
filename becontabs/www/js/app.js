// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers', 'starter.services'])

.run(function( $ionicPlatform, $rootScope ) {
  $ionicPlatform.ready(function( ) {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleLightContent();
    }

    // beacon code 

    function createBeacon() {
      var uuid = 'f7826da6-4fa2-4e98-8024-bc5b71e0893e'; // mandatory
      var identifier = 'our identifier'; // mandatory
      var minor = 0; // optional, defaults to wildcard if left empty
      var major = 0; // optional, defaults to wildcard if left empty
      // throws an error if the parameters are not valid
      var beaconRegion = new cordova.plugins.locationManager.BeaconRegion(identifier, uuid, major, minor);

      return beaconRegion;
    };
    //
    //
    var logToDom = function (message) {
      alert(message);
    };

      var delegate = new cordova.plugins.locationManager.Delegate().implement({

          didDetermineStateForRegion: function (pluginResult) {

              logToDom('[DOM] didDetermineStateForRegion: ' + JSON.stringify(pluginResult));
          },

          didStartMonitoringForRegion: function (pluginResult) {
              logToDom('didStartMonitoringForRegion:' + JSON.stringify(pluginResult));
          },

          didRangeBeaconsInRegion: function (pluginResult) {
              logToDom('[DOM] didRangeBeaconsInRegion: ' + JSON.stringify(pluginResult));
          }
      });

    //
    var beaconRegion = new beaconRegion();
    cordova.plugins.locationManager.setDelegate(delegate);
    cordova.plugins.locationManager.startMonitoringForRegion(beaconRegion)
        .fail(console.error)
        .done();

    /*if( cordova.plugins.locationManager ){

      var app = {};
      var regions =
      [
        // Estimote Beacon factory UUID.
        {uuid:'f7826da6-4fa2-4e98-8024-bc5b71e0893e'},
        // Sample UUIDs for beacons in our lab.
        {uuid:'F7826DA6-4FA2-4E98-8024-BC5B71E0893E'},
        {uuid:'8DEEFBB9-F738-4297-8040-96668BB44281'},
        {uuid:'A0B13730-3A9A-11E3-AA6E-0800200C9A66'},
        {uuid:'E20A39F4-73F5-4BC4-A12F-17D1AD07A961'},
        {uuid:'A4950001-C5B1-4B44-B512-1370F02D74DE'}
      ];
      var beacons = {};
      var updateTimer = null;

      window.locationManager = cordova.plugins.locationManager;  
      var delegate = new locationManager.Delegate();
    //  alert( JSON.stringify(delegate) );
      delegate.didRangeBeaconsInRegion = function(pluginResult) {
        alert('didRangeBeaconsInRegion: ' + JSON.stringify(pluginResult))
      };
      // Set the delegate object to use.
      locationManager.setDelegate(delegate);  


    } else {
      alert('cordova.plugins.locationManager not found');
    }*/
    





  });
})

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

  // setup an abstract state for the tabs directive
    .state('tab', {
    url: '/tab',
    abstract: true,
    templateUrl: 'templates/tabs.html'
  })

  // Each tab has its own nav history stack:

  .state('tab.dash', {
    url: '/dash',
    views: {
      'tab-dash': {
        templateUrl: 'templates/tab-dash.html',
        controller: 'DashCtrl'
      }
    }
  })

  .state('tab.chats', {
      url: '/chats',
      views: {
        'tab-chats': {
          templateUrl: 'templates/tab-chats.html',
          controller: 'ChatsCtrl'
        }
      }
    })
    .state('tab.chat-detail', {
      url: '/chats/:chatId',
      views: {
        'tab-chats': {
          templateUrl: 'templates/chat-detail.html',
          controller: 'ChatDetailCtrl'
        }
      }
    })

  .state('tab.account', {
    url: '/account',
    views: {
      'tab-account': {
        templateUrl: 'templates/tab-account.html',
        controller: 'AccountCtrl'
      }
    }
  });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/tab/dash');

});
