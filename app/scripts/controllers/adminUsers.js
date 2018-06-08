'use strict';

/**
 * @ngdoc function
 * @name AulaVirtualApp.controller:AdminusersCtrl
 * @description
 * # AdminusersCtrl
 * Controller of the AulaVirtualApp
 */
angular.module('AulaVirtualApp')
  .controller('AdminUsersCtrl', function ($scope, $location, userService, adminService) {
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
    $scope.users = {};
    $scope.alerta = {};

    adminService.getUsers().then(
        function(response) {
            // obtenemos todos los usuarios registrados
            var res = response.data;
            $scope.users = res.data;
        },
        function(){
            $location.path('/error');
        }
    );

    $scope.getGenderIcon = function(gender){
        return (gender === false) ? 'male' : 'female';
    }

    $scope.getGender = function(gender){
        return (gender === false) ? 'Hombre' : 'Mujer';
    }

    $scope.getRole = function(role){
        if(role == 1){
            return "Administador";
        }else if(role == 2){
            return "Instructor";
        }else if(role == 3){
            return "Alumno";
        }
    }
    
    $scope.userDelete = function(user){
        if(user.role_id == 1){
            alert("No puede eliminar Usuarios Administradores");
        } else {
            $scope.alerta.id = user.id;
            adminService.userDelete($scope.alerta.id).then(
                function(response){
                    var res = response.data;
                    $("#msg-alertBox").text('Usuario eliminado correctamente');
                    $scope.alerta.show = true;
                    $scope.users.splice($scope.users.indexOf(user), 1);
                },
                function(){
                    $("#msg-alertBox").text('Error: No se pudo eliminar al usuario');
                    $scope.alerta.show = true;
                }
            );
        }
    }

  });