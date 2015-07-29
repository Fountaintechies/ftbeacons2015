/*var app = (function()
{
  // Application object.
  var app = {};

  // Specify your beacon 128bit UUIDs here.
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

  // Dictionary of beacons.
  var beacons = {};

  // Timer that displays list of beacons.
  var updateTimer = null;

  app.initialize = function()
  {
    document.addEventListener(
      'deviceready',
      function() {  
                    window.locationManager = cordova.plugins.locationManager;
    
                    // Start tracking beacons!
                    startScan();

                    // Display refresh timer.
                    updateTimer = setInterval( function(){
                      displayBeaconList();
                      //alert( JSON.stringify( beacons) );
                      

                    }, 2000);
                    //evothings.scriptsLoaded(onDeviceReady)
                     },
      false);
  };

  function onDeviceReady()
  {
    
    
    // Specify a shortcut for the location manager holding the iBeacon functions.
    
  }

  function startScan()
  {
    // The delegate object holds the iBeacon callback functions
    // specified below.
    
    var delegate = new locationManager.Delegate();
    
    // Called continuously when ranging beacons.
    delegate.didRangeBeaconsInRegion = function(pluginResult)
    {
      console.log('didRangeBeaconsInRegion: ' + JSON.stringify(pluginResult))
      alert( 'didRangeBeaconsInRegion: ' + JSON.stringify(pluginResult) );
      for (var i in pluginResult.beacons)
      {
        // Insert beacon into table of found beacons.
        var beacon = pluginResult.beacons[i];
        beacon.timeStamp = Date.now();
        var key = beacon.uuid + ':' + beacon.major + ':' + beacon.minor;
        beacons[key] = beacon;
      }
    };

    // Called when starting to monitor a region.
    // (Not used in this example, included as a reference.)
    delegate.didStartMonitoringForRegion = function(pluginResult)
    {
      //console.log('didStartMonitoringForRegion:' + JSON.stringify(pluginResult))
    };

    // Called when monitoring and the state of a region changes.
    // (Not used in this example, included as a reference.)
    delegate.didDetermineStateForRegion = function(pluginResult)
    {
      //console.log('didDetermineStateForRegion: ' + JSON.stringify(pluginResult))
    };

    // Set the delegate object to use.
    locationManager.setDelegate(delegate);

    // Request permission from user to access location info.
    // This is needed on iOS 8.
    locationManager.requestAlwaysAuthorization();

    // Start monitoring and ranging beacons.
    for (var i in regions)
    {
      var beaconRegion = new locationManager.BeaconRegion(
        i + 1,
        regions[i].uuid);

      // Start ranging.
      locationManager.startRangingBeaconsInRegion(beaconRegion)
        .fail(console.error)
        .done();

      // Start monitoring.
      // (Not used in this example, included as a reference.)
      locationManager.startMonitoringForRegion(beaconRegion)
        .fail(console.error)
        .done();
    }
  }

  function displayBeaconList()
  {
    
    alert( beacon );
    // Clear beacon list.
    $('#found-beacons').empty();

    var timeNow = Date.now();
    
    // Update beacon list.
    $.each(beacons, function(key, beacon)
    {
      // Only show beacons that are updated during the last 60 seconds.
      if (beacon.timeStamp + 60000 > timeNow)
      {
        // Map the RSSI value to a width in percent for the indicator.
        var rssiWidth = 1; // Used when RSSI is zero or greater.
        if (beacon.rssi < -100) { rssiWidth = 100; }
        else if (beacon.rssi < 0) { rssiWidth = 100 + beacon.rssi; }

        // Create tag to display beacon data.
        var element = $(
          '<li>'
          + '<strong>UUID: ' + beacon.uuid + '</strong><br />'
          + 'Major: ' + beacon.major + '<br />'
          + 'Minor: ' + beacon.minor + '<br />'
          + 'Proximity: ' + beacon.proximity + '<br />'
          + 'RSSI: ' + beacon.rssi + '<br />'
          +   '<div style="background:rgb(255,128,64);height:20px;width:'
          +     rssiWidth + '%;"></div>'
          + '</li>'
        );

        $('#warning').remove();
        $('#found-beacons').append(element);
      }
    });
    
  }

  return app;
})();

app.initialize();


*/

angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope, $rootScope) {
  

  ionic.Platform.ready(function(){
    // will execute when device is ready, or immediately if the device is already ready.
    //alert( 'in dash ctrl beacon' );
  });
  $scope.stopmonitoring = function(){
    var uuid = 'f7826da6-4fa2-4e98-8024-bc5b71e0893e';
    var identifier = 'beaconOnTheMacBooksShelf';
    var minor = 53710;
    var major = 43612;
    var beaconRegion = new cordova.plugins.locationManager.BeaconRegion(identifier, uuid, major, minor);

    cordova.plugins.locationManager.stopMonitoringForRegion(beaconRegion)
        .fail( alert( console.error ) )
        .done( );

  }
  $scope.startmonitoring = function()
  {
     
  }
  
  $scope.startranging = function(){

      var logToDom = function (message) {
          var e = document.createElement('label');
          e.innerText = message;
          var node = document.getElementById("found-beacons");
          var br2 = document.createElement('br');
          node.appendChild(e);
          node.appendChild(br2);
      };

    var delegate = new cordova.plugins.locationManager.Delegate();

    delegate.didDetermineStateForRegion = function (pluginResult) {

        logToDom('[DOM] didDetermineStateForRegion: ' + JSON.stringify(pluginResult));
        cordova.plugins.locationManager.appendToDeviceLog('[DOM] didDetermineStateForRegion: '
            + JSON.stringify(pluginResult));
    };

    delegate.didStartMonitoringForRegion = function (pluginResult) {
        console.log('didStartMonitoringForRegion:', pluginResult);
        logToDom('didStartMonitoringForRegion:' + JSON.stringify(pluginResult));
    };

    delegate.didRangeBeaconsInRegion = function (pluginResult) {
        if ( pluginResult.beacons.length > 0 ) {
          logToDom('[DOM] didRangeBeaconsInRegion: ' + JSON.stringify(pluginResult));        
        }
    };



    var beaconRegions = [
                          {
                            id: 'Singapre',
                            uuid:'f7826da6-4fa2-4e98-8024-bc5b71e0893e',
                            major: 43612,
                            minor: 53710
                          },
                          {
                            id: 'Swiss',
                            uuid:'f7826da6-4fa2-4e98-8024-bc5b71e0893e',
                            major: 50633,
                            minor: 2239
                          },
                          {
                            id: 'India',
                            uuid:'f7826da6-4fa2-4e98-8024-bc5b71e0893e',
                            major: 63253,
                            minor: 57994
                          }
                        ];

    cordova.plugins.locationManager.setDelegate(delegate);

    // required in iOS 8+
    cordova.plugins.locationManager.requestWhenInUseAuthorization(); 
    // or cordova.plugins.locationManager.requestAlwaysAuthorization()

    // Start monitoring and ranging beacons.
    for (var f in beaconRegions)
    {
      var region = beaconRegions[f];
      var beaconRegion = new cordova.plugins.locationManager.BeaconRegion( region.id, region[f].uuid, region.major, region.minor);
      
      // Start ranging.
      cordova.plugins.locationManager.startRangingBeaconsInRegion(beaconRegion)
      .fail(console.error)
      .done();      

    }


  }  

  

})

.controller('ChatsCtrl', function($scope, Chats) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  };
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});
