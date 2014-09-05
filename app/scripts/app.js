'use strict';

/**
 * @ngdoc overview
 * @name clientAdminApp
 * @description
 * # clientAdminApp
 *
 * Main module of the application.
 */
 angular
 .module('clientAdminApp', [
  'ngResource',
  'ngRoute',
  'ngMessages'
  ])
 .config(function ($routeProvider) {
  $routeProvider.when('/', { templateUrl: 'views/main.html', controller: 'MainCtrl'});

  $routeProvider.when('/create', { templateUrl: 'views/create.html', controller: 'VoteDefCreateCtrl'});
  $routeProvider.when(
  	'/edit/:id', 
  	{ 
  		templateUrl: 'views/edit.html', 
  		controller: 'VoteDefEditCtrl'
  // 		resolve: {
  // 			voteDef: function($route, $http){
  // 				return $http.get(
		//             'http://localhost:8000/api/voteDefs/'+$route.current.params.id,
		//             {headers: {'Content-Type': 'application/json'}}
		//         )
		//         .success(function(data, status, headers, config){
		//             console.log("Success: ",data);
		//             return data;
		//         })
		//         .error(function(data, status, headers, config){
		//             console.log("Error: ", data);
		//         });
		//   	}
		// }
  	}
  );

  $routeProvider.when('/about', { templateUrl: 'views/about.html', controller: 'AboutCtrl' });
  $routeProvider.otherwise({ redirectTo: '/' });
})
.value('BASE_URL','http://piczmar.aplikacje.mydevil.net');
// .value('BASE_URL', 'http://localhost:8000');
