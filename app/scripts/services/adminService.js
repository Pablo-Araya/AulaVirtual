'use strict';

/**
 * @ngdoc service
 * @name AulaVirtualApp.adminService
 * @description
 * # adminService
 * Service in the AulaVirtualApp.
 */
angular.module('AulaVirtualApp')
  .service('adminService', function ($http) {
    // AngularJS will instantiate a singleton by calling "new" on this function

    return {

    	getUsers: function(){
            return $http({
                method: 'GET',
                url: 'http://localhost:3000/api/v1/users',
            });
        },

        userDelete: function(id){
            return $http({
                method: 'DELETE',
                url: 'http://localhost:3000/api/v1/users/'+id,
                data: id
            });
        }

    }
  });
