'use strict';

/**
 * @ngdoc function
 * @name AulaVirtualApp.controller:MiscursosCtrl
 * @description
 * # MiscursosCtrl
 * Controller of the AulaVirtualApp
 */
angular.module('AulaVirtualApp')
  .controller('MisCursosCtrl', function ($scope, $location, userService, catedraService) {

    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ]

    $scope.viewsAny = {};
    $scope.cursosID = {};
    $scope.enrolledCursos = {};
    $scope.allCursos = {};
    $scope.misCursos = {};
    $scope.flags = {};
    $scope.user = userService.usuario;
    $scope.instructores = {};
    $scope.estadisticas = {};
    $scope.estadisticasCount = {};

    var flags = [];
    var cursosID = [];
    var total = 0;

    userService.getMisCursos($scope.user.id)
        .then(
            function(response) {
                var res = response.data;

                // almacenamos el id que tiene el usuario en la tabla Profesores
                userService.usuario.perfil_id = res.data[0].student;

                // obtenemos todas las catedras
                $scope.enrolledCursos = res.data;
                $scope.enrolledCursos.shift();
                for (var i=0; i<$scope.enrolledCursos.length; i++) {
                    if (!cursosID.find(x => x.id == $scope.enrolledCursos[i]["id"])){
                        cursosID.push({
                            id : $scope.enrolledCursos[i]["id"], 
                            cur: $scope.enrolledCursos[i]["catedra_id"],
                            std: $scope.enrolledCursos[i]["student_id"],
                            cgy: 0
                        });

                        flags.push({
                            bolA: false,
                            bolB: false,
                            bolC: false,
                            bolD: false,
                        });
                    }
                    total = i+1;
                }
                $scope.viewsAny.show = true;
                $scope.cursosID = cursosID;
                $scope.flags = flags;
            },
            function(response){
                var res = response.data;

                // almacenamos el id que tiene el usuario en la tabla Profesores
                userService.usuario.perfil_id = res.data[0].student;
            }
        );

    $scope.viewCurso = function(cursoId) {
        $location.path( '/misCursos/'+cursoId );
    }

    // Traemos la info del nombre y lo almacenamos en $scope.instructores
    // Traemos la info de las notas, las sumamos y almacenamos en $scope.stats
    var myCursos = [];

    var instructoresNames = [];
    var estadisticasAvg = [];
    var estadisticasCount = [];

    $scope.getInstructor_getAvg = function() {
        $scope.allCursos.count = total;

        for (var i=0; i<$scope.allCursos.count; i++) {
            if (cursosID.find(x => x.id == $scope.cursosID[i]["id"])){
                if($scope.flags[i]["bolA"] == false){
                    getCatedras(i);
                }
                if($scope.flags[i]["bolB"] == false){
                    getInstructorName(i);
                }
                if($scope.flags[i]["bolC"] == false){
                    getStatistics(i);
                }
                if($scope.flags[i]["bolD"] == false){
                    countStatistics(i);
                }
            }
        }
    }

    function getCatedras(i) {
        catedraService.getCatedra(cursosID[i]['cur']).then(
            function(response) {
                var res = response.data.data;
                if (!myCursos.find(x => x.id == res.id)){
                    myCursos.push({
                        id         : res.id,
                        category_id: res.category_id,
                        teacher_id : res.teacher_id,
                        title      : res.title,
                        description: res.description,
                        img        : res.img
                    });
                }
            },
            function(){
                alert("error");
                $scope.viewsAny.show = false
            }
        )
        $scope.misCursos = myCursos;
        $scope.flags[i]["bolA"] = true;
    }

    function getInstructorName(i) {
        catedraService.getInstructorName(cursosID[i]['cgy'], cursosID[i]['cur'])
            .then(
                function(response) {
                    var res = response.data.data;
                    if (!instructoresNames.find(x => x.id == $scope.misCursos[i]["id"])){
                        instructoresNames.push({
                            id : $scope.misCursos[i]["id"],
                            ins: res
                        });
                    }
                },
                function(){
                    if (!instructoresNames.find(x => x.id == $scope.misCursos[i]["id"])){
                        instructoresNames.push({
                            id : $scope.misCursos[i]["id"], 
                            ins: 'Error al cargar!'
                        });
                    }
                }
            );
        $scope.instructores = instructoresNames;
        $scope.flags[i]["bolB"] = true;
    }

    function getStatistics(i) {
        catedraService.getStatsByCatedra(cursosID[i]['cgy'], cursosID[i]['cur'])
            .then(
                function(response) {
                    var res = response.data.data;
                    if (!estadisticasAvg.find(x => x.id == $scope.misCursos[i]["id"])){
                        estadisticasAvg.push({
                            id : $scope.misCursos[i]["id"],
                            avg: res
                        });
                    }
                },
                function(){
                    if (!estadisticasAvg.find(x => x.id == $scope.misCursos[i]["id"])){
                        estadisticasAvg.push({
                            id : $scope.misCursos[i]["id"], 
                            avg: 0
                        });
                    }
                }
            );
        $scope.estadisticas = estadisticasAvg;
        $scope.flags[i]["bolC"] = true;
    }

    function countStatistics(i) {
        catedraService.countStatsByCatedra(cursosID[i]['cgy'], cursosID[i]['cur'])
            .then(
                function(response) {
                    var res = response.data.data;
                    if (!estadisticasCount.find(x => x.id == $scope.misCursos[i]["id"])){
                        estadisticasCount.push({
                            id : $scope.misCursos[i]["id"],
                            count: res
                        });
                    }
                },
                function(){
                    if (!estadisticasCount.find(x => x.id == $scope.misCursos[i]["id"])){
                        estadisticasCount.push({
                            id : $scope.misCursos[i]["id"], 
                            count: 0
                        });
                    }
                }
            );
        $scope.estadisticasCount = estadisticasCount;
        $scope.flags[i]["bolD"] = true;
    }

    //Mostramos la data en pantalla
    $scope.callMyTeacher = function(element) {
        for (var i=0; i<$scope.allCursos.count; i++) {
            if(element == $scope.instructores[i].id) {
                return $scope.instructores[i].ins;
            }
        }
    }

    $scope.callMyAvg = function(element) {
        for (var i=0; i<$scope.allCursos.count; i++) {
            if(element == $scope.estadisticas[i].id) {
                return $scope.estadisticas[i].avg;
            }
        }
    }

    $scope.callStarSet = function(element) {
        var stars = "";

        for (var i=0; i<$scope.allCursos.count; i++) {
            if(element == $scope.estadisticas[i].id && $scope.estadisticas[i].avg > 0) {
                var avg = $scope.estadisticas[i].avg;
                avg = avg.split('.');

                var int = avg[0];
                var dec = avg[1];
                var end = parseInt(5-Math.ceil($scope.estadisticas[i].avg));

                for(var j=0; j<int; j++) {
                    stars += "<span class=\"star full\"></span>";
                }
                stars += (dec == 0) ? "" : "<span class=\"star half\"></span>";
                for(var c=0; c<end; c++) {
                    stars += "<span class=\"star\"></span>";
                }
                
            }else if(element == $scope.estadisticas[i].id && $scope.estadisticas[i].avg == 0) {
                for(var n=0; n<5; n++) {
                    stars += "<span class=\"star\"></span>";
                }
            }
        }
        
        $("#rate"+element).html(stars);
    }

    $scope.callCountVotes = function(element) {
        for (var i=0; i<$scope.allCursos.count; i++) {
            if(element == $scope.estadisticasCount[i].id) {
                return $scope.estadisticasCount[i].count;
            }
        }
    }
    
    $scope.callCountVotesText = function(element) {
        for (var i=0; i<$scope.allCursos.count; i++) {
            if(element == $scope.estadisticasCount[i].id) {
                var text = ($scope.estadisticasCount[i].count !== 1) ? 's' : '';
                return text;
            }
        }
    }

  });