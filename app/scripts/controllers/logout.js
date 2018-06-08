'use strict';

/**
 * @ngdoc function
 * @name AulaVirtualApp.controller:LogoutCtrl
 * @description
 * # LogoutCtrl
 * Controller of the AulaVirtualApp
 */
angular.module('AulaVirtualApp')
  .controller('LogoutCtrl', function ($scope, $location, authService, userService) {
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
    $scope.logout = authService;

    // Elimina el Token de la Base de Datos
    setTimeout(
        function() {
            authService.destroyToken($scope.user.id)
                .then(
                    function(response) {
                        $scope.logout.res = response.data;
                        authService.token_security = undefined;
                        authService.show = false;
                        authService.userId = undefined;
                        authService.actualizado = undefined;
                        userService.usuario = undefined;
                        $location.path('/');
                    },
                    function() { // optional
                        $scope.logout.message = "ERROR";
                        authService.show = false;
                        authService.userId = undefined;
                        authService.actualizado = undefined;
                        userService.usuario = undefined;
                        $location.path('/');

                    }
                );
                console.log($scope.logout);
        },3000);

  });
