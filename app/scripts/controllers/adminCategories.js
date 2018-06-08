'use strict';

/**
 * @ngdoc function
 * @name AulaVirtualApp.controller:AdmincategoriesCtrl
 * @description
 * # AdmincategoriesCtrl
 * Controller of the AulaVirtualApp
 */
angular.module('AulaVirtualApp')
  .controller('AdminCategoriesCtrl', function ($scope, $route, $location, userService, catedraService) {
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
    $scope.categorias = {};
    $scope.alerta = {};

    catedraService.getAllCategories().then(
        function(response) {
            var res = response.data.data;
            $scope.categorias = res;
            catedraService.categorias = res;
        },
        function(){
            $location.path('/error');
        }
    );

    $scope.categoryEdit = function(category){
        $scope.alerta.new = false;
        $scope.alerta.show = false;
        $scope.alerta.edit = true;
        $scope.categorias.edit = {
            id: category.id,
            icon: category.icon,
            title: category.title,
            description: category.description
        }
    }

    $scope.categoryUpdate = function(category){
        $scope.alerta.edit = false;

        catedraService.categoryUpdate(category).then(
            function(response) {
                var res = response.data.data;
                $scope.categorias.push({
                    id: res.id,
                    icon: res.icon,
                    title: res.title,
                    description: res.description,
                    created_at: res.created_at
                });
            },
            function(){
                $location.path('/error');
            }
        );
        $("#msg-alertBox").text('Categoría modificada correctamente: '+$scope.categorias.edit.title);
        $scope.alerta.show = true;
        $route.reload();

    }

    $scope.categoryNewForm = function() {
        $scope.alerta.show = false;
        $scope.alerta.edit = false;
        $scope.alerta.new = true;
        $scope.categorias.new = {};
    }

    $scope.categoryNew = function(category) {
        $scope.alerta.new = false;
        $scope.categorias.new = category;
        catedraService.newCategory(category).then(
            function(response) {
                var res = response.data.data;
                $scope.categorias.push({
                    id: res.id,
                    icon: res.icon,
                    title: res.title,
                    description: res.description,
                    created_at: res.created_at
                });
            },
            function(response){
                $("#msg-alertBox").text('Errores: '+response.data.data);
                $scope.alerta.show = true;
            }
        );
        $("#msg-alertBox").text('Nueva categoría creada: '+category.title);
        $scope.alerta.show = true;
        // $route.reload();
    }

  });