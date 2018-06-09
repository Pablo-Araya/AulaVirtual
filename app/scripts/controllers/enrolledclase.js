'use strict';

/**
 * @ngdoc function
 * @name AulaVirtualApp.controller:EnrolledclaseCtrl
 * @description
 * # EnrolledclaseCtrl
 * Controller of the AulaVirtualApp
 */
angular.module('AulaVirtualApp')
  .controller('EnrolledClaseCtrl', function ($scope, $location, catedraService, userService) {
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
	$scope.claseID = {};
	$scope.catedra = {};
	
	// obtengo ID de la URI
    var identifier = vm.url.split('/');
    $scope.catedraID = identifier[2];
    $scope.claseID = identifier[4];
    $scope.user = userService.usuario;

    catedraService.getCatedra($scope.catedraID)
    .then(
    	function(response){
    		var res = response.data.data;
    		$scope.catedra = res;
    		getCategory(res.category_id);
    		getTeacher(res.category_id, res.id);
    		getClase(res.id, $scope.claseID);
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

	function getClase(catedra, clase) {
		catedraService.getClase(catedra, clase).then(
	        function(response) {
	            var res = response.data.data;
	            $scope.clase = res;
	        },
	        function(){
	            $location.path('/error');
	        }
	    );
	}

  });
