'use strict';

/**
 * @ngdoc function
 * @name AulaVirtualApp.controller:RegisterCtrl
 * @description
 * # RegisterCtrl
 * Controller of the AulaVirtualApp
 */
angular.module('AulaVirtualApp')
  .controller('RegisterCtrl', function ($scope, $location, $window, userService) {
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

    $scope.register = {}
    
    $scope.registerSend = function(){
    	if($scope.register.email !== $scope.register.emailConfirmation) {
            $scope.register.error = "El email no coincide";
            $scope.register.success = undefined;
        } else if($scope.register.password !== $scope.register.passwordConfirmation) {
            $scope.register.error = "El password no coincide";
            $scope.register.success = undefined;
        } else {
            userService.registerUser($scope.register)
            .then(
                function() {
                    $scope.register.error = undefined;
                    $scope.register.success = "OK";
                    setTimeout(function() {
                        $location.path( "/" );
                    },3000);

                },
                function(response) { // optional
                    $scope.register.success = undefined;
                    if(response.data.data.email[0] !== undefined){
                        $scope.register.errorEmail = "Ya existe un usuario con este email " + $scope.register.email;                        
                    }
                    if(response.data.data.username[0] !== undefined){
                        $scope.register.errorUser = "Ya existe un usuario con este username " + $scope.register.username;
                    }
                    if(response.data.data.password[0] !== undefined){
                        $scope.register.errorPassword = "El password debe tener al menos 8 caracteres";
                    }
                }
            );
            console.log($scope.register);
        }
    }

    $scope.goBack = function(){
		$window.history.back();
    }


  });