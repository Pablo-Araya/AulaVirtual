'use strict';

/**
 * @ngdoc service
 * @name AulaVirtualApp.CatedraService
 * @description
 * # CatedraService
 * Service in the AulaVirtualApp.
 */
angular.module('AulaVirtualApp')
  .service('catedraService', function ($http) {
    // AngularJS will instantiate a singleton by calling "new" on this function

    return {
        
        getAllCategories: function(){
            return $http({
                method: 'GET',
                url: 'http://localhost:3000/api/v1/categories'
            });
        },

        getCategory: function(categoryId){
            return $http({
                method: 'GET',
                url: 'http://localhost:3000/api/v1/categories/'+categoryId,
                data: categoryId
            });
        },

        categoryUpdate: function(category){
            return $http({
                method: 'PUT',
                url: 'http://localhost:3000/api/v1/categories/'+category.id,
                data: category
            });
        },

        newCategory: function(category){
            return $http({
                method: 'POST',
                url: 'http://localhost:3000/api/v1/categories/',
                data: category
            });
        },

        getCatedra: function(id){
            return $http({
                method: 'GET',
                url: 'http://localhost:3000/api/v1/categories/0/catedras/'+id,
                data: id
            });
        },

        getAllCatedrasFromCategory: function(categoryId){
            return $http({
                method: 'GET',
                url: 'http://localhost:3000/api/v1/categories/'+categoryId+'/catedras',
                data: categoryId
            });
        },

        getInstructorName: function(categoryId, catedraId){
            return $http({
                method: 'GET',
                url: 'http://localhost:3000/api/v1/categories/'+categoryId+'/catedras/'+catedraId+'/teacherName',
                data: catedraId
            });
        },

        getStatsByCatedra: function(categoryId, catedraId){
            return $http({
                method: 'GET',
                url: 'http://localhost:3000/api/v1/categories/'+categoryId+'/catedras/'+catedraId+'/avg',
                data: catedraId
            });
        },

        countStatsByCatedra: function(categoryId, catedraId){
            return $http({
                method: 'GET',
                url: 'http://localhost:3000/api/v1/categories/'+categoryId+'/catedras/'+catedraId+'/catedra_surveys',
                data: catedraId
            });
        },

        crearCatedra: function(catedra){
            return $http({
                method: 'POST',
                url: 'http://localhost:3000/api/v1/categories/'+catedra.category_id+'/catedras',
                data: catedra
            });            
        },

        uploadFile: function(imageScr){
            return $http({
                method: 'POST',
                url: 'http://www.morphosys.cl/aulaVirtual/upload.php',
                data: imageScr,
                transformRequest: angular.identity,
                headers: {'Content-Type': undefined}
            });
        },

        enrollCurso: function(enroll){
            return $http({
                method: 'POST',
                url: 'http://localhost:3000/api/v1/users/'+enroll.user_id+'/misCursos',
                data: enroll
            });
        },

        getClases: function(catedra){
            return $http({
                method: 'GET',
                url: 'http://localhost:3000/api/v1/categories/0/catedras/'+catedra+'/clases',
                data: catedra
            });
        },

        getClase: function(catedra, clase){
            return $http({
                method: 'GET',
                url: 'http://localhost:3000/api/v1/categories/0/catedras/'+catedra+'/clases/'+clase,
                data: catedra
            });
        },

        getNotifications: function(clase){
            return $http({
                method: 'GET',
                url: 'http://localhost:3000/api/v1/categories/0/catedras/0/clases/'+clase+'/notifications',
                data: clase
            });
        }

    }

  });
