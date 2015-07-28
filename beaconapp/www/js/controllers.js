angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout, API) {
 
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});
  
  // Form data for the login modal
  $scope.loginData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modalLogin = modal;
  });

  // Create the signup modal that we will use later
  $ionicModal.fromTemplateUrl('templates/signup.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modalSignup = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modalLogin.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modalLogin.show();
  };

  $scope.closeSignup = function() {
    $scope.modalSignup.hide();
  };

  // Open the login modal
  $scope.signup = function() {
    $scope.modalSignup.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };

  // Create a new controller method for creating new profiles
  $scope.doSignup = function() {
    // Use the form fields to create a new profile $resource object
      var profile = new API({
          firstName: this.firstName,
          lastName: this.lastName,
          email: this.email
      });

      console.log('PROFILE SIGNUP');
      // Use the profile '$save' method to send an appropriate POST request
      profile.$signup(function(response) {
        // If an profile was created successfully, redirect the user to the profile's page 
          // $location.path('profiles/' + response._id);
          console.log('SUCCESS');
          console.log(response);
      }, function(errorResponse) {
          console.log('ERROR');
          console.log(errorResponse);
        // Otherwise, present the user with the error message
          $scope.error = errorResponse;
      });
  };

})

.controller('BeaconCtrl', function($scope,$rootScope) {

  // $scope.$watch(function() {return $rootScope.second;},
  //   function() {$scope.ticker = $rootScope.second;});

//EVO CODE START
//EVO CODE END

})

.controller('PlaylistsCtrl', function($scope) {
  $scope.playlists = [
    { title: 'Reggae', id: 1 },
    { title: 'Chill', id: 2 },
    { title: 'Dubstep', id: 3 },
    { title: 'Indie', id: 4 },
    { title: 'Rap', id: 5 },
    { title: 'Cowbell', id: 6 }
  ];
})

.controller('PlaylistCtrl', function($scope, $stateParams) {
});
