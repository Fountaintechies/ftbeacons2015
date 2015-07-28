// Invoke 'strict' JavaScript mode
'use strict';

// Create the 'profiles' controller
angular.module('profiles').controller('ProfileController', ['$scope', 'Authentication',
	function($scope, Authentication) {
		// Expose the authentication service
		$scope.authentication = Authentication;
	}
]);
