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
  
  $scope.clear = function(){
    document.getElementById("found-beacons").innerHTML = '';
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
          //logToDom('[DOM] didRangeBeaconsInRegion: ' + JSON.stringify(pluginResult));        
          logToDom('[DOM] didRangeBeaconsInRegion: ' + pluginResult.region.identifier +' is '+pluginResult.beacons[0].proximity );        
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
                          /*{
                            id: 'India',
                            uuid:'f7826da6-4fa2-4e98-8024-bc5b71e0893e',
                            major: 63253,
                            minor: 57994
                          }*/
                        ];

    cordova.plugins.locationManager.setDelegate(delegate);

    // required in iOS 8+
    cordova.plugins.locationManager.requestWhenInUseAuthorization(); 
    // or cordova.plugins.locationManager.requestAlwaysAuthorization()

    // Start monitoring and ranging beacons.
    for (var f in beaconRegions)
    {
      var region = beaconRegions[f];
      
      var beaconRegion = new cordova.plugins.locationManager.BeaconRegion( region.id, region.uuid, region.major, region.minor);
      
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
