// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
var app = angular.module('starter', ['ionic', 'starter.controllers'])

.run(function($ionicPlatform, $rootScope, $state, $stateParams) {
  
  $rootScope.$state = $state;
  $rootScope.$stateParams = $stateParams;
  
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
    if (window.cordova) window.locationManager = cordova.plugins.locationManager;

  });

//define beacons
  var rnac = {
    uuid: 'f7826da6-4fa2-4e98-8024-bc5b71e0893e',
    identifier:'rnac',
    major: '43612',
    minor: '53710',
    mac: 'C5:B3:45:CE:18:48',
    vendor: 'Kontakt.io'
  };

  var a8sf = {
    uuid: 'f7826da6-4fa2-4e98-8024-bc5b71e0893e',
    identifier:'a8sf',
    major: '50633',
    minor: '2239',
    mac: 'E9:7F:71:E4:D1:F4',
    vendor: 'Kontakt.io'
  };

  var ppis = {
    uuid: 'f7826da6-4fa2-4e98-8024-bc5b71e0893e',
    identifier:'ppis',
    major: '63253',
    minor: '57994',
    mac: 'DB:7E:D1:FB:6A:4E',
    vendor: 'Kontakt.io'
  };

  app.beaconRegions = [rnac,a8sf,ppis];

  // // Currently displayed page.
  // app.currentPage = 'page-default'
  alert('Start');
  $state.go('app.browse');
  console.log($state.current.name);

  app.initialize = function() {
    document.addEventListener(
      'deviceready',
      app.onDeviceReady,
      false)
    // app.gotoPage(app.currentPage)
  };

  // Called when Cordova are plugins initialised,
  // the iBeacon API is now available.
  app.onDeviceReady = function() {
    // Specify a shortcut for the location manager that
    // has the iBeacon functions.
    window.locationManager = cordova.plugins.locationManager

    // Start tracking beacons!
    app.startScanForBeacons()
  };

  app.startScanForBeacons = function() {
    alert('ScanForBeacons');
    //console.log('startScanForBeacons')

    // The delegate object contains iBeacon callback functions.
    // The delegate object contains iBeacon callback functions.
    var delegate = new cordova.plugins.locationManager.Delegate()

    delegate.didDetermineStateForRegion = function(pluginResult)
    {
      //console.log('didDetermineStateForRegion: ' + JSON.stringify(pluginResult))
    }

    delegate.didStartMonitoringForRegion = function(pluginResult)
    {
      //console.log('didStartMonitoringForRegion:' + JSON.stringify(pluginResult))
    }

    delegate.didRangeBeaconsInRegion = function(pluginResult)
    {
      //console.log('didRangeBeaconsInRegion: ' + JSON.stringify(pluginResult))
      app.didRangeBeaconsInRegion(pluginResult)
    }

    // Set the delegate object to use.
    locationManager.setDelegate(delegate)

    // Start monitoring and ranging our beacons.
    for (var r in app.beaconRegions)
    {
      var region = app.beaconRegions[r]

      var beaconRegion = new locationManager.BeaconRegion(
        region.identifier, region.uuid, region.major, region.minor)

      // Start monitoring.
      locationManager.startMonitoringForRegion(beaconRegion)
        .fail(console.error)
        .done()

      // Start ranging.
      locationManager.startRangingBeaconsInRegion(beaconRegion)
        .fail(console.error)
        .done()
    }
  };

  // Display pages depending of which beacon is close.
  app.didRangeBeaconsInRegion = function(pluginResult) {

    // There must be a beacon within range.
    if (0 == pluginResult.beacons.length)
    {
      return
    }

    // Our regions are defined so that there is one beacon per region.
    // Get the first (and only) beacon in range in the region.
    var beacon = pluginResult.beacons[0]

    // The region identifier is the page id.
    var pageId = pluginResult.region.identifier

    $rootScope.beacon = beacon;

    //console.log('ranged beacon: ' + pageId + ' ' + beacon.proximity)

    // If the beacon is close and represents a new page, then show the page.
    if (!$state.includes(pageId)){
      $state.go('app.beacon-'+pageId);
      return
    }

    // If the beacon represents the current page but is far away,
    // then show the default page.
    // if (beacon.proximity == 'ProximityFar' || beacon.proximity == 'ProximityUnknown') {
    //   $state.go('app.browse');
    //   return
    // }
  };

  // Set up the application.
  app.initialize();

})

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

  .state('app', {
    url: "/app",
    abstract: true,
    templateUrl: "templates/menu.html",
    controller: 'AppCtrl'
  })

  .state('app.beacon-a8sf', {
    url: "/beacon/a8sf",
    views: {
      'menuContent': {
        templateUrl: "templates/beacon.a8sf.html",
        controller: 'BeaconsCtrl'
      }
    }
  })

  .state('app.beacon-ppis', {
    url: "/beacon/ppis",
    views: {
      'menuContent': {    
        templateUrl: "templates/beacon.ppis.html",
        controller: 'BeaconsCtrl'
      }
    }
  })    

  .state('app.beacon-rnac', {
    url: "/beacon/rnac",
    views: {
      'menuContent': {    
        templateUrl: "templates/beacon.rnac.html",
        controller: 'BeaconsCtrl'
      }
    }
  })  

  .state('app.search', {
    url: "/search",
    views: {
      'menuContent': {
        templateUrl: "templates/search.html"
      }
    }
  })

  .state('app.browse', {
    url: "/browse",
    views: {
      'menuContent': {
        templateUrl: "templates/browse.html"
      }
    }
  })

    .state('app.playlists', {
      url: "/playlists",
      views: {
        'menuContent': {
          templateUrl: "templates/playlists.html",
          controller: 'PlaylistsCtrl'
        }
      }
    })

  .state('app.single', {
    url: "/playlists/:playlistId",
    views: {
      'menuContent': {
        templateUrl: "templates/playlist.html",
        controller: 'PlaylistsCtrl'
      }
    }
  });
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/playlists');
});