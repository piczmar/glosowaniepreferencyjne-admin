'use strict';

/**
 * @ngdoc function
 * @name clientAdminApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the clientAdminApp
 */
angular.module('clientAdminApp')
  .controller('AboutCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
