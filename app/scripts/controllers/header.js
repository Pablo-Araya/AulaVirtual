'use strict';

/**
 * @ngdoc function
 * @name AulaVirtualApp.controller:HeaderCtrl
 * @description
 * # HeaderCtrl
 * Controller of the AulaVirtualApp
 */
angular.module('AulaVirtualApp')
  .controller('HeaderCtrl', function ($scope, $location, authService, catedraService) {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    var vm = this;
    vm.url = $location.path();

    // Toma los datos del Token si existe
    $scope.authToken = authService;

    // muestra la URI actual
    $scope.activeURL = vm.url;

    // Muestra todas las categorías en select del menú header 
    catedraService.getAllCategories()
        .then(
            function(response) {
                var res = response.data.data;
                $scope.categorias = res;
            },
            function(){
                $location.path('/error');
            }
        );
        console.log($scope.categories);

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