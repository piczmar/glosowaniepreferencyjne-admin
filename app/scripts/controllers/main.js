'use strict';

/**
 * @ngdoc function
 * @name clientAdminApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the clientAdminApp
 */
angular.module('clientAdminApp')
  .controller('MainCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
