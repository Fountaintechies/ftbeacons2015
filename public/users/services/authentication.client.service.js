// Invoke 'strict' JavaScript mode
'use strict';

// Create the 'Authentication' service
angular.module('users').factory('Authentication', [
	function() {
		// Use the rendered user object
		this.user = window.user;
		if (this.user) this.user.admin = window.user && window.user.email.search("@fountaintechies.com") !== -1 ? true : false;

		// Return the authenticated user data
		return {
			user: this.user
		};
	}
]);