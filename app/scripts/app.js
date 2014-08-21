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
  $routeProvider.when('/edit/:id', { templateUrl: 'views/edit.html', controller: 'VoteDefEditCtrl'});

  $routeProvider.when('/about', { templateUrl: 'views/about.html', controller: 'AboutCtrl' });
  $routeProvider.otherwise({ redirectTo: '/' });
});
