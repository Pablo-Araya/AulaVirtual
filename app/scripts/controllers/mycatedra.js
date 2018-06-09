'use strict';

/**
 * @ngdoc function
 * @name AulaVirtualApp.controller:MycatedraCtrl
 * @description
 * # MycatedraCtrl
 * Controller of the AulaVirtualApp
 */
angular.module('AulaVirtualApp')
  .controller('MyCatedraCtrl', function ($scope, $location, catedraService, userService) {
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
	$scope.clases = {};
	$scope.edit = {};
	$scope.new = {};
	$scope.edit.show = false;
	$scope.new.show = false;
	
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
	    		$scope.clases.show = true; 
	        },
	        function(){
	    		$scope.clases.show = false;
	    		$scope.clases.message = "Oops!.... aún no has creado ninguna clase para esta cátedra";
	        }
	    );
	}

	$scope.goClass = function(clase) {
		$location.path('misCatedras/' + identifier[2] + '/myClase/' + clase);
	}

	$scope.editClass = function(clase) {
		$scope.edit.show = true;
		$scope.new.show = false;
	}

	$scope.newClass = function() {
		$scope.new.show = true;
		$scope.edit.show = false;
	}

	$scope.deleteClass = function(clase, index) {
	    $scope.clases.splice(index, 1);
	    $scope.$apply();
	}

  });