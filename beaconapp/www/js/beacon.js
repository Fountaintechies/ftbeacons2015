
var app = angular.module('beacon.controllers', [])

.controller('RangeCtrl', function($scope)
{
//define beacons
var rnac = {
  uuid: 'f7826da6-4fa2-4e98-8024-bc5b71e0893e',
  identifier:'RNaC',
  major: '43612',
  minor: '53710',
  mac: 'C5:B3:45:CE:18:48',
  vendor: 'Kontakt.io'
}

var a8sf = {
  uuid: 'f7826da6-4fa2-4e98-8024-bc5b71e0893e',
  identifier:'a8Sf',
  major: '50633',
  minor: '2239',
  mac: 'E9:7F:71:E4:D1:F4',
  vendor: 'Kontakt.io'
}

var ppis = {
  uuid: 'f7826da6-4fa2-4e98-8024-bc5b71e0893e',
  identifier:'ppis',
  major: '63253',
  minor: '57994',
  mac: 'DB:7E:D1:FB:6A:4E',
  vendor: 'Kontakt.io'
}

//Beacons.setbeaconName = 100;
$scope.beaconName = 'no beacon in range';

beaconRegions = [rnac,a8sf,ppis];

alert('switched to search');

app.initialize = function() {
  document.addEventListener(
    'deviceready',
    mainapp.onDeviceReady,
    false);
    alert('initialize app');
};

// Called when Cordova are plugins initialised,
// the iBeacon API is now available.
app.onDeviceReady = function() {
  // Specify a shortcut for the location manager that
  // has the iBeacon functions.
  window.locationManager = cordova.plugins.locationManager
  alert('locationManager...');
  // Start tracking beacons!
  app.startScanForBeacons()
};

app.startScanForBeacons = function() {
  //console.log('startScanForBeacons')
  alert('start scanning...');
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
      region.id, region.uuid, region.major, region.minor)

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

  //console.log('ranged beacon: ' + pageId + ' ' + beacon.proximity)

  // If the beacon is close and represents a new page, then show the page.
  if (beacon.proximity == 'ProximityImmediate') 
  {
    $scope.beaconName = pageId;
    return
  }

  // If the beacon represents the current page but is far away,
  // then show the default page.
  if (beacon.proximity == 'ProximityFar' || beacon.proximity == 'ProximityUnknown')
  {
    $scope.beaconName = 'no beacon in range';
    return
  }
};

// Set up the application.
app.initialize();
});