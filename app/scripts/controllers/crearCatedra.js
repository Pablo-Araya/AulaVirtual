'use strict';

/**
 * @ngdoc function
 * @name AulaVirtualApp.controller:CreacatedraCtrl
 * @description
 * # CreacatedraCtrl
 * Controller of the AulaVirtualApp
 */
angular.module('AulaVirtualApp')
  .controller('CrearCatedraCtrl', function ($scope, $location, catedraService, userService, fileReader) {
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

    $scope.catedra = {};
    $scope.categorias = catedraService.categorias;
    $scope.user = userService.usuario;

    $scope.catedra.imageSrc = {};
    $scope.catedra.teacher_id  = userService.usuario.perfil_id;

    $scope.$on("fileProgress", function(e, progress) {
      $scope.progress = progress.loaded / progress.total;
    });

    $scope.newCatedra = function(catedra) {

        // primero manejamos la imagen
        var fichero = $('#image_file')[0].files[0];

        if (fichero) {
            var tipo = fichero.name;
            tipo = tipo.split(".");
            tipo = '.'+tipo[tipo.length-1];

            var fichero_token = "";
                var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
                for (var i = 0; i < 7; i++){
                    fichero_token += possible.charAt(Math.floor(Math.random() * possible.length));
                }
            var fichero_token_name = $scope.catedra.teacher_id+'-'+fichero_token+tipo;

            var imageScr = new FormData();

            if($scope.catedra.category_id && $scope.catedra.title && $scope.catedra.description){
                if($scope.catedra.title.length < 2){
                    $scope.catedra.success = false;
                    $scope.catedra.error = true;
                    $scope.catedra.message = 'Título debe tener al menos 2 caracteres';
                }else{
                    $scope.catedra.img  = 'http://www.morphosys.cl/aulaVirtual/uploads/'+fichero_token_name;

                    imageScr.append("FileName", $scope.catedra.imageSrc);
                    imageScr.append("nombre", fichero_token_name);

                    catedraService.uploadFile(imageScr)
                    .then(
                        function(response){
                            check = response.data;                     
                        }
                    );
                }
            }else{
                $scope.catedra.success = false;
                $scope.catedra.error = true;
                $scope.catedra.message = 'Complete los campos vacíos';
            }
        }
        else{
            $scope.catedra.success = false;
            $scope.catedra.error = true;
            $scope.catedra.message = 'Debe ingresar una imagen';
        }

        // luego manejamos la catedra
        $scope.catedra.category_id = catedra.category_id;
        $scope.catedra.teacher_id = catedra.teacher_id;
        $scope.catedra.title = catedra.title;
        $scope.catedra.description = catedra.description;
        $scope.catedra.img = catedra.img;

        catedraService.crearCatedra($scope.catedra)
        .then(
            function(response) {
                var res = response.data;
                alert('cátedra ingresada');

                $scope.catedra.error = false;
                $scope.catedra.success = true;
                $scope.catedra.message = res.message;
                returnView();
            },
            function() { // optional
                var res = response.data;
                $scope.catedra.success = false;
                $scope.catedra.error = true;
                $scope.catedra.message = res.message;
                
            }
        );
    }

    $scope.misCatedrasView = function(){
        $location.path( "/misCatedras" );
    }

    function returnView(){
        $location.path( "/misCatedras" );
    }

  });
