'use strict';

/**
 * @ngdoc function
 * @name AulaVirtualApp.controller:MiscatedrasCtrl
 * @description
 * # MiscatedrasCtrl
 * Controller of the AulaVirtualApp
 */
angular.module('AulaVirtualApp')
  .controller('MisCatedrasCtrl', function () {
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
  });
