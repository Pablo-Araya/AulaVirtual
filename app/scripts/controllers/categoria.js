'use strict';

/**
 * @ngdoc function
 * @name AulaVirtualApp.controller:CategoriaCtrl
 * @description
 * # CategoriaCtrl
 * Controller of the AulaVirtualApp
 */
angular.module('AulaVirtualApp')
  .controller('CategoriaCtrl', function ($scope, $location, catedraService, userService, authService) {
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
    $scope.instructor = {};
    $scope.enrollData = {};

    // Toma los datos del User para validar Role
    $scope.user = userService.usuario;

    // Toma los datos del Token
    $scope.authToken = authService;

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
                $scope.catedras.empty = true;
            },
            function(){
                $scope.catedras.empty = false;
            }
        );
        console.log($scope.catedras);
    
    $scope.loginView = function(){
      $location.path('/');
    }

    // Traemos la info del nombre y lo almacenamos en $scope.instructores
    // Traemos la info de las notas, las sumamos y almacenamos en $scope.stats
    var instructoresID = [];
    var instructoresNames = [];
    var estadisticasAvg = [];
    var estadisticasCount = [];

    $scope.getInstructor_getAvg = function() {
        $scope.instructor.count = $(".card").length;

        for (var i=0; i<$scope.instructor.count; i++) {
            if (!instructoresID.find(x => x.id == $scope.catedras[i]["id"])){
                instructoresID.push({
                    cat: $scope.category.id,
                    id : $scope.catedras[i]["id"] 
                });
                getInstructorName(i);
                getStatistics(i);
                countStatistics(i);
            }
        }
    }

    function getInstructorName(i) {
        catedraService.getInstructorName(instructoresID[i]['cat'], instructoresID[i]['id'])
            .then(
                function(response) {
                    var res = response.data.data;
                    if (!instructoresNames.find(x => x.ins == $scope.catedras[i]["ins"])){
                        instructoresNames.push({
                            cat: $scope.category.id,
                            id : $scope.catedras[i]["id"],
                            ins: res
                        });
                    }
                },
                function(){
                    if (!instructoresNames.find(x => x.ins == $scope.catedras[i]["ins"])){
                        instructoresNames.push({
                            cat: $scope.category.id,
                            id : $scope.catedras[i]["id"], 
                            ins: 'Error al cargar!'
                        });
                    }
                }
            );
        $scope.instructores = instructoresNames;
    }

    function getStatistics(i) {
        catedraService.getStatsByCatedra(instructoresID[i]['cat'], instructoresID[i]['id'])
            .then(
                function(response) {
                    var res = response.data.data;
                    if (!estadisticasAvg.find(x => x.id == $scope.catedras[i]["id"])){
                        estadisticasAvg.push({
                            cat: $scope.category.id,
                            id : $scope.catedras[i]["id"],
                            avg: res
                        });
                    }
                },
                function(){
                    if (!estadisticasAvg.find(x => x.id == $scope.catedras[i]["id"])){
                        estadisticasAvg.push({
                            cat: $scope.category.id,
                            id : $scope.catedras[i]["id"], 
                            avg: 0
                        });
                    }
                }
            );
        $scope.estadisticas = estadisticasAvg;
    }

    function countStatistics(i) {
        catedraService.countStatsByCatedra(instructoresID[i]['cat'], instructoresID[i]['id'])
            .then(
                function(response) {
                    var res = response.data.data;
                    if (!estadisticasCount.find(x => x.id == $scope.catedras[i]["id"])){
                        estadisticasCount.push({
                            cat: $scope.category.id,
                            id : $scope.catedras[i]["id"],
                            count: res
                        });
                    }
                },
                function(){
                    if (!estadisticasCount.find(x => x.id == $scope.catedras[i]["id"])){
                        estadisticasCount.push({
                            cat: $scope.category.id,
                            id : $scope.catedras[i]["id"], 
                            count: 0
                        });
                    }
                }
            );
        $scope.estadisticasCount = estadisticasCount;
    }

    //Mostramos la data en pantalla
    $scope.callMyTeacher = function(element) {
        for (var i=0; i<$scope.instructor.count; i++) {
            if(element == $scope.instructores[i].id) {
                return $scope.instructores[i].ins;
            }
        }
    }

    $scope.callMyAvg = function(element) {
        for (var i=0; i<$scope.instructor.count; i++) {
            if(element == $scope.estadisticas[i].id) {
                return $scope.estadisticas[i].avg;
            }
        }
    }

    $scope.callStarSet = function(element) {
        var stars = "";

        for (var i=0; i<$scope.instructor.count; i++) {
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
        for (var i=0; i<$scope.instructor.count; i++) {
            if(element == $scope.estadisticasCount[i].id) {
                return $scope.estadisticasCount[i].count;
            }
        }
    }
    $scope.callCountVotesText = function(element) {
        for (var i=0; i<$scope.instructor.count; i++) {
            if(element == $scope.estadisticasCount[i].id) {
                var text = ($scope.estadisticasCount[i].count !== 1) ? 's' : '';
                return text;
            }
        }
    }
    
    $scope.enroll = function(catedraId, userId, studentId, catedraName) {
        if($scope.authToken.token_security){
            if($scope.user.role_id == 3){
                $scope.enrollData.user_id = userId;
                $scope.enrollData.student_id = studentId;
                $scope.enrollData.catedra_id = catedraId;

                catedraService.enrollCurso($scope.enrollData).then(
                    function(response) {
                    var res = response.data;
                    $scope.enrollData.msg = res.message;
                    $scope.enrollData.status = res.status;
                    $scope.enrollData.title = catedraName;
                    },
                    function(response){
                        var res = response.data;
                        $scope.enrollData.msg = res.message;
                        $scope.enrollData.status = res.status;
                        $scope.enrollData.title = catedraName;
                    }
                );
            }else{
                alert('Debes iniciar sesión como alumno')
            }
        }else{
            alert('debes iniciar sesión');
        }
    }


  });