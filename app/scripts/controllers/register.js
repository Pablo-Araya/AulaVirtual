'use strict';

/**
 * @ngdoc function
 * @name AulaVirtualApp.controller:RegisterCtrl
 * @description
 * # RegisterCtrl
 * Controller of the AulaVirtualApp
 */
angular.module('AulaVirtualApp')
  .controller('RegisterCtrl', function ($scope, $location, register) {
    this.awesomeThings = [
		'HTML5 Boilerplate',
		'AngularJS',
		'Karma'
    ];
    var vm = this;
    vm.plantilla = {
    	url: 'views/plantilla.html'
    };

    $scope.register = {}

    $scope.registerSend = function(){
    	if($scope.register.email == undefined) {
            $scope.register.error = "Ingrese campo requerido";
            $scope.register.success = undefined;
        } else {
            register.registerPass($scope.register)
            .then(
                function() {
                    $scope.register.error = undefined;
                    $scope.register.success = "OK";
                },
                function() { // optional
                    $scope.register.error = "Correo electrónico inválido";
                    $scope.register.success = undefined;
                }
            );
            console.log($scope.register);
        }
    }

    $scope.loginView = function(){
		$location.path( "/" );
    }


  });