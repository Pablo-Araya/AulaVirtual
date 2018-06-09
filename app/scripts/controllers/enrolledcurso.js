'use strict';

/**
 * @ngdoc function
 * @name AulaVirtualApp.controller:EnrolledcursoCtrl
 * @description
 * # EnrolledcursoCtrl
 * Controller of the AulaVirtualApp
 */
angular.module('AulaVirtualApp')
  .controller('EnrolledCursoCtrl', function ($scope, $location, catedraService, userService) {
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

	$scope.catedraID = {};
	$scope.catedra = {};
	$scope.alerta = {};
	
	// obtengo ID de la URI
    var identifier = vm.url.split('/');
    $scope.catedraID = identifier[2];

    $scope.user = userService.usuario;

    catedraService.getCatedra($scope.catedraID)
    .then(
    	function(response){
    		var res = response.data.data;
    		$scope.catedra = res;
    		getCategory(res.category_id);
    		getTeacher(res.category_id, res.id);
    		getClases(res.id);
    	},
    	function(){
    		$location.path('/error');
    	}
    );

    function getCategory(category) {
	    catedraService.getCategory(category)
	    .then(
	    	function(response){
	    		var res = response.data.data;
	    		$scope.catedra.category = res.title;
	    	},
	    	function(){
    			$location.path('/error');
	    	}
	    )
    }

    function getTeacher(category, catedra) {
	    catedraService.getInstructorName(category, catedra)
	    .then(
	    	function(response){
	    		var res = response.data.data;
	    		$scope.catedra.teacher = res;
	    	},
	    	function(){
				$location.path('/error');
	    	}
	    )
	}

	function getClases(catedra) {
		catedraService.getClases(catedra).then(
	        function(response) {
	            // obtenemos todos los usuarios registrados
	            var res = response.data;
	            $scope.clases = res.data;
	        },
	        function(){
	    		$scope.alerta.show = true;
	    		$scope.alerta.message = "Lo sentimos, el instructor aún no ha creado ninguna clase para esta cátedra";
	        }
	    );
	}

	$scope.goClass = function(catedra) {
		$location.path('misCursos/' + identifier[2] + '/clase/' + catedra);
	}

  });