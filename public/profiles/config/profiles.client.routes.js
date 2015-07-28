// Invoke 'strict' JavaScript mode
'use strict';

// Configure the 'profiles' module routes
angular.module('profiles').config(['$routeProvider',
	function($routeProvider) {
		$routeProvider.
		when('/', {
			templateUrl: 'profiles/views/profiles.client.view.html'
		}).
		otherwise({
			redirectTo: '/'
		});
	}
]); 
