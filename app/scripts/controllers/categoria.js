'use strict';

/**
 * @ngdoc function
 * @name AulaVirtualApp.controller:CategoriaCtrl
 * @description
 * # CategoriaCtrl
 * Controller of the AulaVirtualApp
 */
angular.module('AulaVirtualApp')
  .controller('CategoriaCtrl', function ($scope, $location, catedraService) {
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
    vm.url = $location.path();

    $scope.category = {};
    $scope.catedras = {};

    // obtengo ID de la URI
    var identifier = vm.url.split('/');
    $scope.category.id = identifier[2];

	// obtengo datos de la categoría
    catedraService.getCategory($scope.category.id)
        .then(
            function(response) {
                var res = response.data.data;
                $scope.category = res;
            },
            function(){
                $location.path('/error');
            }
        );
        console.log($scope.catedras);

    // trae todos los cursos de la categoría
    catedraService.getAllCatedrasFromCategory($scope.category.id)
        .then(
            function(response) {
                var res = response.data.data;
                $scope.catedras = res;
                catedraService.selectedCategory = res;
            },
            function(){
                $scope.catedras.empty = true;
            }
        );
        console.log($scope.catedras);
    
  });
