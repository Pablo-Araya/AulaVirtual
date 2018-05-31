'use strict';

/**
 * @ngdoc function
 * @name AulaVirtualApp.controller:MiscursosCtrl
 * @description
 * # MiscursosCtrl
 * Controller of the AulaVirtualApp
 */
angular.module('AulaVirtualApp')
  .controller('MisCursosCtrl', function ($scope, $location, userService) {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
    var vm = this;
    vm.layout = {
        header: 'views/header.html',
        footer: 'views/footer.html'
    };

    $scope.user = userService;

    userService.getMisCursos($scope.user.id);
  });