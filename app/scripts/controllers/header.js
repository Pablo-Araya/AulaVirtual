'use strict';

/**
 * @ngdoc function
 * @name AulaVirtualApp.controller:HeaderCtrl
 * @description
 * # HeaderCtrl
 * Controller of the AulaVirtualApp
 */
angular.module('AulaVirtualApp')
  .controller('HeaderCtrl', function ($scope, $location, authService, catedraService, userService) {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    var vm = this;
    vm.url = $location.path();

    // Toma los datos del User para validar Role
    $scope.user = userService.usuario;

    // Toma los datos del Token
    $scope.authToken = authService;
    
    // muestra la URI actual
    $scope.activeURL = vm.url;

    // Muestra todas las categorías en select del menú header, 
    // si ya las cargó de la base de datos, entonces no las cargará nuevamente
    if(catedraService.categorias == undefined){
        catedraService.getAllCategories()
            .then(
                function(response) {
                    var res = response.data.data;
                    $scope.categorias = res;
                    catedraService.categorias = res;
                },
                function(){
                    $location.path('/error');
                }
            );
            console.log($scope.categorias);
    }else{
        $scope.categorias = catedraService.categorias;
    }

    // Comprueba si URI corresponde a nav-link para agregar CSS 'nav-active'
    $scope.activeMenu = function(route){
      $scope.activeURL = route;
    }

    // Redirección de cada nav-link
    $scope.linkMenu = function(url){
      $scope.activeMenu(url);
      $location.path(url);
    }

  });