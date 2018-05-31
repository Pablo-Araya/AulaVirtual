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

        getAllCatedrasFromCategory: function(categoryId){
            return $http({
                method: 'GET',
                url: 'http://localhost:3000/api/v1/categories/'+categoryId+'/catedras',
                data: categoryId
            })
        }

    }

  });
