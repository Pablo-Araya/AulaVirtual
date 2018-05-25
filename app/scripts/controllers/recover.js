'use strict';

/**
 * @ngdoc function
 * @name AulaVirtualApp.controller:RecoverCtrl
 * @description
 * # RecoverCtrl
 * Controller of the AulaVirtualApp
 */
angular.module('AulaVirtualApp')
  .controller('RecoverCtrl', function ($scope, $location, recover) {
    this.awesomeThings = [
		'HTML5 Boilerplate',
		'AngularJS',
		'Karma'
    ];
    var vm = this;
    vm.plantilla = {
    	url: 'views/plantilla.html'
    };

    $scope.recover ={}

    $scope.recoverSend = function(){
    	if($scope.recover.email == undefined) {
            $scope.recover.error = "Ingrese campo requerido";
            $scope.recover.success = undefined;
        } else {
            recover.recoverPass($scope.recover)
            .then(
                function() {
                    $scope.recover.error = undefined;
                    $scope.recover.success = "OK";
                },
                function() { // optional
                    $scope.recover.error = "Correo electrónico inválido";
                    $scope.recover.success = undefined;
                }
            );
            console.log($scope.recover);
        }
    }

    $scope.loginView = function(){
		$location.path( "/" );
    }


  });
