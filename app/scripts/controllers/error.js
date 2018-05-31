'use strict';

/**
 * @ngdoc function
 * @name AulaVirtualApp.controller:ErrorCtrl
 * @description
 * # ErrorCtrl
 * Controller of the AulaVirtualApp
 */
angular.module('AulaVirtualApp')
  .controller('ErrorCtrl', function () {
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
