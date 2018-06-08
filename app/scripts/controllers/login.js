'use strict';

/**
 * @ngdoc function
 * @name AulaVirtualApp.controller:LoginCtrl
 * @description
 * # LoginCtrl
 * Controller of the AulaVirtualApp
 */
angular.module('AulaVirtualApp')
  .controller('LoginCtrl', function ($scope, $location, authService, userService) {
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

    $scope.user = userService.usuario;
    $scope.login = authService;

    $scope.getRole = function(role_id) {
        if(role_id == 1){
            userService.usuario.role = "Administrador";
            return "Administrador";
        }
        else if(role_id == 2){
            userService.usuario.role = "Profesor";
            return "Profesor";
        }
        else if(role_id == 3){
            userService.usuario.role = "Alumno";
            return "Alumno";
        }
    } 

    // Debemos esperar a que se almacene el token en la base de datos para verificar si existe
    setTimeout(
        function() {
            authService.compareToken($scope.user.id)
                .then(
                    function(response) {
                        $scope.login.message = "ok";
                        $scope.login.res = response.data;
                        if($scope.user.role_id == 2){
                            $location.path('/misCatedras');
                        }
                        if($scope.user.role_id == 3){
                            $location.path('/misCursos');
                        }
                        if($scope.user.role_id == 1){
                            $location.path('/admin/users');
                        }
                    },
                    function() { // optional
                        $scope.login.message = "ERROR";
                        $location.path('/')
                    }
                );
                console.log($scope.login);
        },3000);

  });