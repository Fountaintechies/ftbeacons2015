angular.module('starter.services', [])

.service('Beacons', function() {

  this.setBeaconName = function (name) {
    var beaconName = name;
    return true;
  };

  this.getBeaconName = function () {
    var beaconName = beaconName || 'not yet defined';
    return beaconName;
  };
  
});
