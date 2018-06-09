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
                            bolE: false,
                            show: false,
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
                $scope.flags[i]["show"] = true;   
            }
        }
    }

    function getCatedras(i) {
        if(!userService.getCatedra){
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

            if(++i === $scope.allCursos.count){
                userService.getCatedra = $scope.misCursos;
            }

        }else{
            $scope.misCursos = userService.getCatedra;
            $scope.flags[i]["bolA"] = true;
        }
    }

    function getInstructorName(i) {
        if(!userService.getInstructorName){
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
            $scope.$apply();

            if(++i === $scope.allCursos.count){
                userService.getInstructorName = $scope.instructores;
            }

        }else{
            $scope.instructores = userService.getInstructorName;
            $scope.flags[i]["bolB"] = true;
        }
    }

    function getStatistics(i) {
        if(!userService.getStatistics){
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
            $scope.$apply();

            if(++i === $scope.allCursos.count){
                userService.getStatistics = $scope.estadisticas;
            }

        }else{
            $scope.estadisticas = userService.getStatistics;
            $scope.flags[i]["bolC"] = true;
        }
    }

    function countStatistics(i) {
        if(!userService.countStatistics){
            catedraService.countStatsByCatedra(cursosID[i]['cgy'], cursosID[i]['cur'])
                .then(
                    function(response) {
                        var res = response.data.data;
                        var txt = (res == '1') ? '' : 's';
                        if (!estadisticasCount.find(x => x.id == $scope.misCursos[i]["id"])){
                            estadisticasCount.push({
                                id : $scope.misCursos[i]["id"],
                                count: res,
                                text: txt
                            });
                        }
                    },
                    function(){
                        if (!estadisticasCount.find(x => x.id == $scope.misCursos[i]["id"])){
                            estadisticasCount.push({
                                id : $scope.misCursos[i]["id"], 
                                count: 0,
                                txt: 's'
                            });
                        }
                    }
                );
            $scope.estadisticasCount = estadisticasCount;
            $scope.flags[i]["bolD"] = true;
            $scope.$apply();

            if(++i === $scope.allCursos.count){
                i--;
                userService.countStatistics = $scope.estadisticasCount;
            }

        }else{
            $scope.estadisticasCount = userService.countStatistics;
            $scope.flags[i]["bolD"] = true;
        }
    }

    // Mostramos la data en pantalla
    $scope.getTeacher = function(id) {
        var teacher = $scope.instructores.find(x => x.id === id);
        return teacher.ins;
    }

    $scope.getAvg = function(id) {
        var average = $scope.estadisticas.find(x => x.id === id);
        return average.avg;
    }

    $scope.getVotes = function(id) {
        var vote = $scope.estadisticasCount.find(x => x.id === id);
        return vote.count;
    }

    $scope.getVotesTxt = function(id) {
        var voteTxt = $scope.estadisticasCount.find(x => x.id === id);
        return voteTxt.txt;
    }

    $scope.starSet = function(id) {
        var stars = "";
        var average = $scope.estadisticas.find(x => x.id === id);

        if(average.avg > 0) {
            var prom = average.avg;
            var avg = prom.split('.');

            var int = avg[0];
            var dec = avg[1];
            var end = parseInt(5-Math.ceil(average.avg));

            for(var j=0; j<int; j++) {
                stars += "<span class=\"star full\"></span>";
            }
            
            stars += (dec == 0) ? "" : "<span class=\"star half\"></span>";

            for(var c=0; c<end; c++) {
                stars += "<span class=\"star\"></span>";
            }

        }else if(average.avg == 0) {
            
            for(var n=0; n<5; n++) {
                stars += "<span class=\"star\"></span>";
            }
        
        }
        
        $("#rate"+id).html(stars);
    }

  });