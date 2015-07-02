// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
var app = angular.module('starter', ['ionic','ngResource', 'starter.controllers','starter.APIs'])

.run(function($ionicPlatform, $rootScope) {
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

  var update = function () {
    $rootScope.second = 0;
    setInterval(function(){ $rootScope.second ++; $rootScope.$digest();}, 1000);

  };

  update();

// ##############iBeacon Code START
  // History of enter/exit events.
  var mRegionEvents = [];

  // Nearest ranged beacon.
  var mNearestBeacon = null;

  // Timer that displays nearby beacons.
  var mNearestBeaconDisplayTimer = null;

  // Background flag.
  var mAppInBackground = false;

  // Background notification id counter.
  var mNotificationId = 0;

  // Mapping of region event state names.
  // These are used in the event display string.
  var mRegionStateNames =
  {
    'CLRegionStateInside': 'Enter',
    'CLRegionStateOutside': 'Exit'
  };

  // Here monitored regions are defined.
  // TODO: Update with uuid/major/minor for your beacons.
  // You can add as many beacons as you want to use.
  var mRegions =
  [
    {
      id: 'region1',
      uuid: 'f7826da6-4fa2-4e98-8024-bc5b71e0893e',
      major: 43612,
      minor: 53710
    },
    {
      id: 'region2',
      uuid: 'f7826da6-4fa2-4e98-8024-bc5b71e0893e',
      major: 50633,
      minor: 2239
    },
    {
      id: 'region3',
      uuid: 'f7826da6-4fa2-4e98-8024-bc5b71e0893e',
      major: 63253,
      minor: 57994
    }
  ];

  // Region data is defined here. Mapping used is from
  // region id to a string. You can adapt this to your
  // own needs, and add other data to be displayed.
  // TODO: Update with major/minor for your own beacons.
  var mRegionData =
  {
    'region1': 'Newton Point',
    'region2': 'Changi Point',
    'region3': 'City Square'
  };

  initialize = function()
  {
    $rootScope.nearestBeacon = {uuid: 'unavailable', major: 'unavailable', minor: 'unavailable', proximity: 'unavailable', accuracy: 'unavailable', rssi: 'unavailable'};
    document.addEventListener('deviceready', onDeviceReady, false);
    document.addEventListener('pause', onAppToBackground, false);
    document.addEventListener('resume', onAppToForeground, false);
  };

  function onDeviceReady()
  {
    startMonitoringAndRanging();
    startNearestBeaconDisplayTimer();
    displayRegionEvents();
  }

  function onAppToBackground()
  {
    mAppInBackground = true;
    stopNearestBeaconDisplayTimer();
  }

  function onAppToForeground()
  {
    mAppInBackground = false;
    startNearestBeaconDisplayTimer();
    displayRegionEvents();
  }

  function startNearestBeaconDisplayTimer()
  {
    mNearestBeaconDisplayTimer = setInterval(displayNearestBeacon, 1000);
  }

  function stopNearestBeaconDisplayTimer()
  {
    clearInterval(mNearestBeaconDisplayTimer);
    mNearestBeaconDisplayTimer = null;
  }

  function startMonitoringAndRanging()
  {
    alert('startMonitoringAndRanging');
    function onDidDetermineStateForRegion(result)
    {
      saveRegionEvent(result.state, result.region.identifier);
      displayRecentRegionEvent();
    }

    function onDidRangeBeaconsInRegion(result)
    {
      updateNearestBeacon(result.beacons);
    }

    function onError(errorMessage)
    {
      console.log('Monitoring beacons did fail: ' + errorMessage);
      alert('Monitoring beacons did fail: ' + errorMessage);
    }

    // Request permission from user to access location info.
    cordova.plugins.locationManager.requestAlwaysAuthorization();

    // Create delegate object that holds beacon callback functions.
    var delegate = new cordova.plugins.locationManager.Delegate();
    cordova.plugins.locationManager.setDelegate(delegate);

    // Set delegate functions.
    delegate.didDetermineStateForRegion = onDidDetermineStateForRegion;
    delegate.didRangeBeaconsInRegion = onDidRangeBeaconsInRegion;

    // Start monitoring and ranging beacons.
    startMonitoringAndRangingRegions(mRegions, onError);
  }

  function startMonitoringAndRangingRegions(regions, errorCallback)
  {
    // Start monitoring and ranging regions.
    for (var i in regions)
    {
      startMonitoringAndRangingRegion(regions[i], errorCallback);
    }
  }

  function startMonitoringAndRangingRegion(region, errorCallback)
  {
    // Create a region object.
    var beaconRegion = new cordova.plugins.locationManager.BeaconRegion(
      region.id,
      region.uuid,
      region.major,
      region.minor);

    // Start ranging.
    cordova.plugins.locationManager.startRangingBeaconsInRegion(beaconRegion)
      .fail(errorCallback)
      .done();

    // Start monitoring.
    cordova.plugins.locationManager.startMonitoringForRegion(beaconRegion)
      .fail(errorCallback)
      .done();
  }

  function saveRegionEvent(eventType, regionId)
  {
    // Save event.
    mRegionEvents.push(
    {
      type: eventType,
      time: getTimeNow(),
      regionId: regionId
    });

    // Truncate if more than ten entries.
    if (mRegionEvents.length > 10)
    {
      mRegionEvents.shift();
    }
  }

  function getBeaconId(beacon)
  {
    return beacon.uuid + ':' + beacon.major + ':' + beacon.minor;
  }

  function isSameBeacon(beacon1, beacon2)
  {
    return getBeaconId(beacon1) == getBeaconId(beacon2);
  }

  function isNearerThan(beacon1, beacon2)
  {
    return beacon1.accuracy > 0
      && beacon2.accuracy > 0
      && beacon1.accuracy < beacon2.accuracy;
  }

  function updateNearestBeacon(beacons)
  {
    for (var i = 0; i < beacons.length; ++i)
    {
      var beacon = beacons[i];
      if (!mNearestBeacon)
      {
        mNearestBeacon = beacon;
      }
      else
      {
        if (isSameBeacon(beacon, mNearestBeacon) ||
          isNearerThan(beacon, mNearestBeacon))
        {
          mNearestBeacon = beacon;
        }
      }
    }
  }

  function displayNearestBeacon()
  {
    if (!mNearestBeacon) { return; }

    $rootScope.nearestBeacon = mNearestBeacon;
    $rootScope.$digest();

  }

  function displayRecentRegionEvent()
  {
    if (mAppInBackground)
    {
      // Set notification title.
      var event = mRegionEvents[mRegionEvents.length - 1];
      if (!event) { return; }
      var title = getEventDisplayString(event);

      // Create notification.
      cordova.plugins.notification.local.schedule({
          id: ++mNotificationId,
          title: title });
    }
    else
    {
      displayRegionEvents();
    }
  }

  function displayRegionEvents()
  {
    alert('displayRegionEvents');
    // // Clear list.
    // $('#events').empty();

    // Update list.
    for (var i = mRegionEvents.length - 1; i >= 0; --i)
    {
      var event = mRegionEvents[i];
      var title = getEventDisplayString(event);
      // var element = $(
      //   '<li>'
      //   + '<strong>' + title + '</strong>'
      //   + '</li>'
      //   );
      // $('#events').append(element);
    }

    // // If the list is empty display a help text.
    // if (mRegionEvents.length <= 0)
    // {
    //   var element = $(
    //     '<li>'
    //     + '<strong>'
    //     + 'Waiting for region events, please move into or out of a beacon region.'
    //     + '</strong>'
    //     + '</li>'
    //     );
    //   $('#events').append(element);
    // }
    alert(event);
  }

  function getEventDisplayString(event)
  {
    return event.time + ': '
      + mRegionStateNames[event.type] + ' '
      + mRegionData[event.regionId];
  }

  function getTimeNow()
  {
    function pad(n)
    {
      return (n < 10) ? '0' + n : n;
    }

    function format(h, m, s)
    {
      return pad(h) + ':' + pad(m)  + ':' + pad(s);
    }

    var d = new Date();
    return format(d.getHours(), d.getMinutes(), d.getSeconds());
  }

  initialize();
  });
// ##############iBeacon Code END

})

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

  .state('app', {
    url: "/app",
    abstract: true,
    templateUrl: "templates/menu.html",
    controller: 'AppCtrl'
  })

  .state('app.about', {
    url: "/about",
    views: {
      'menuContent': {
        templateUrl: "templates/about.html"
      }
    }
  })

  .state('app.beacon', {
    url: "/beacon",
    views: {
      'menuContent': {
        templateUrl: "templates/beacon.html",
        controller: 'BeaconCtrl'
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
        controller: 'PlaylistCtrl'
      }
    }
  });
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/about');
});
