'use strict';

/**
 * @ngdoc function
 * @name AulaVirtualApp.controller:PlantillaCtrl
 * @description
 * # PlantillaCtrl
 * Controller of the AulaVirtualApp
 */
angular.module('AulaVirtualApp')
  .controller('PlantillaCtrl', function () {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
    var vm = this;
    vm.plantilla = {
    	url: 'views/plantilla.html'
    };

  });
