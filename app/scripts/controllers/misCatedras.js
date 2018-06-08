'use strict';

/**
 * @ngdoc function
 * @name AulaVirtualApp.controller:MiscatedrasCtrl
 * @description
 * # MiscatedrasCtrl
 * Controller of the AulaVirtualApp
 */
angular.module('AulaVirtualApp')
  .controller('MisCatedrasCtrl', function ($scope, $location, userService, catedraService) {
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

    $scope.catedras = {}
    $scope.user = userService.usuario;

    userService.getMisCatedras($scope.user.id)
        .then(
            function(response) {
                var res = response.data;

                // almacenamos el id que tiene el usuario en la tabla Profesores
                userService.usuario.perfil_id = res.data[0].teacher;

                // obtenemos todas las catedras
                $scope.catedras.misCatedras = res.data;
                $scope.catedras.misCatedras.shift();

                $scope.catedras.show = ($scope.catedras.misCatedras.length) ? true : false;
            },
            function(response){
                var res = response.data;

                // almacenamos el id que tiene el usuario en la tabla Profesores
                userService.usuario.perfil_id = res.data[0].teacher;
                $scope.catedras.show = false;
            }
        );
    
    $scope.crearCatedra = function() {
        $location.path( '/misCatedras/crearCatedra' );
    }

    $scope.viewCatedra = function(catedra) {
        $location.path( '/misCatedras/'+catedra );
    }

    // Traemos la info del nombre y lo almacenamos en $scope.instructores
    // Traemos la info de las notas, las sumamos y almacenamos en $scope.stats
    var estadisticasAvg = [];
    var estadisticasCount = [];
    var myCatedras = [];

    $scope.getAvg = function() {
        $scope.max = $(".card").length;   
        for (var i=0; i<$scope.max; i++) {
            if (!myCatedras.find(x => x.id == $scope.catedras.misCatedras[i]["id"])){
                myCatedras.push({
                    cat: $scope.catedras.misCatedras[i].category_id,
                    id : $scope.catedras.misCatedras[i].id 
                });
                getStatistics(i);
                countStatistics(i);
            }
        }
    }

    function getStatistics(i) {
        catedraService.getStatsByCatedra(myCatedras[i]['cat'], myCatedras[i]['id'])
            .then(
                function(response) {
                    var res = response.data.data;
                    if (!estadisticasAvg.find(x => x.id == $scope.catedras.misCatedras[i].id)){
                        estadisticasAvg.push({
                            cat: $scope.catedras.misCatedras[i].category_id,
                            id : $scope.catedras.misCatedras[i].id,
                            avg: res
                        });
                    }
                },
                function(){
                    if (!estadisticasAvg.find(x => x.id == $scope.catedras.misCatedras[i].id)){
                        estadisticasAvg.push({
                            cat: $scope.catedras.misCatedras[i].category_id,
                            id : $scope.catedras.misCatedras[i].id,
                            avg: 0
                        });
                    }
                }
            );
        $scope.estadisticas = estadisticasAvg;
    }

    function countStatistics(i) {
        catedraService.countStatsByCatedra(myCatedras[i]['cat'], myCatedras[i]['id'])
            .then(
                function(response) {
                    var res = response.data.data;
                    if (!estadisticasCount.find(x => x.id == $scope.catedras.misCatedras[i].id)){
                        estadisticasCount.push({
                            cat: $scope.catedras.misCatedras[i].category_id,
                            id : $scope.catedras.misCatedras[i].id,
                            count: res
                        });
                    }
                },
                function(){
                    if (!estadisticasCount.find(x => x.id == $scope.catedras.misCatedras[i].id)){
                        estadisticasCount.push({
                            cat: $scope.catedras.misCatedras[i].category_id,
                            id : $scope.catedras.misCatedras[i].id,
                            count: 0
                        });
                    }
                }
            );
        $scope.estadisticasCount = estadisticasCount;
    }

    //Mostramos la data en pantalla
    $scope.callMyTeacher = function() {
        var instructor =  $scope.user.nombre + ' ' + $scope.user.lastName;
        return instructor;
    }

    $scope.callMyAvg = function(element) {
        for (var i=0; i<$scope.max; i++) {
            if(element == $scope.estadisticas[i].id) {
                return $scope.estadisticas[i].avg;
            }
        }
    }

    $scope.callStarSet = function(element) {
        var stars = "";

        for (var i=0; i<$scope.max; i++) {
            if(element == $scope.estadisticas[i].id && $scope.estadisticas[i].avg > 0) {
                var avg = $scope.estadisticas[i].avg;
                avg = avg.split('.');

                var int = avg[0];
                var dec = avg[1];
                var end = parseInt(5-Math.ceil($scope.estadisticas[i].avg));

                for(var j=0; j<int; j++) {stars += "<span class=\"star full\"></span>";}
                stars += (dec == 0) ? "" : "<span class=\"star half\"></span>";
                for(var c=0; c<end; c++) {stars += "<span class=\"star\"></span>";}
                
            }else if(element == $scope.estadisticas[i].id && $scope.estadisticas[i].avg == 0){
                for(var n=0; n<5; n++) {stars += "<span class=\"star\"></span>";}
            }
        }
        
        $("#rate"+element).html(stars);
    }

    $scope.callCountVotes = function(element) {
        for (var i=0; i<$scope.max; i++) {
            if(element == $scope.estadisticasCount[i].id) {
                return $scope.estadisticasCount[i].count;
            }
        }
    }
    $scope.callCountVotesText = function(element) {
        for (var i=0; i<$scope.max; i++) {
            if(element == $scope.estadisticasCount[i].id) {
                var text = ($scope.estadisticasCount[i].count !== 1) ? 's' : '';
                return text;
            }
        }
    }


  });