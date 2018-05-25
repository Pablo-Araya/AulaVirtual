'use strict';

/**
 * @ngdoc function
 * @name AulaVirtualApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the AulaVirtualApp
 */
angular.module('AulaVirtualApp')
  .controller('MainCtrl', function ($scope, $location, user) {
    this.awesomeThings = [
        'HTML5 Boilerplate',
        'AngularJS',
        'Karma'
    ];
    var vm = this;
    vm.plantilla = {
    	url: 'views/plantilla.html'
    };


    $scope.user ={}

    $scope.userLogin = function(){
        if($scope.user.username == undefined || $scope.user.password == undefined) {
            $scope.user.error = "Nombre de Usuario y Password son requeridos";
            $scope.user.success = undefined;
        } else {
            user.agregarUser($scope.user)
            .then(
                function() {
                    $scope.user.error = undefined;
                    $scope.user.success = "OK";
                    $scope.user.person = $scope.user.username; 
                },
                function() { // optional
                    $scope.user.error = "Usuario y/o Clave inválida";
                    $scope.user.success = undefined;
                }
            );
            console.log($scope.user);
        }
    }

    $scope.userRecover = function(){
        $location.path( "/recover" );
    }

    $scope.userRegister = function(){
        $location.path( "/register" );
    }


    });
