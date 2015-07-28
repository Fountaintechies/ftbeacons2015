// Invoke 'strict' JavaScript mode
'use strict';

// Create the 'starter.APIs' service
angular.module('starter.APIs',[])

.factory('API', function($resource) {
	// Use the '$resource' service to return an API '$resource' object
    
    var headers = {
        'Access-Control-Allow-Origin' : '*',
        'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
        'Access-Control-Allow-Methods': 'OPTIONS, GET,PUT,POST,DELETE',
        'Accept': 'application/json'
    };

    //path for the API's
    var path = {
    	local: 'http://localhost:3000/api/mobile',
        mobile: 'http://192.168.1.1:3000/api/mobile',
    	server:'http://dev.fountaintechies.com/'
    };
    	
    path.active = path.mobile;

    //specify all API routes and requests here
    return $resource(path.active+'/', {}, {
        signup: {
            method: 'POST',
            // headers: headers,
            url: path.active+'/signup'
        },
        enter: {
            method: 'POST',
            url: path.active+'/regionEvent'
        }
    });
});