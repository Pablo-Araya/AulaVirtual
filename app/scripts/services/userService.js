'use strict';

/**
 * @ngdoc service
 * @name AulaVirtualApp.user
 * @description
 * # user
 * Service in the AulaVirtualApp.
 */
angular.module('AulaVirtualApp')
  .service('userService', function ($http) {
    // AngularJS will instantiate a singleton by calling "new" on this function

    return {
      loginUser: function(user){
        return $http({
          method: 'POST',
          url: 'http://localhost:3000/api/v1/login',
          data: user
        });
      },

      recoverPass: function(user){
        return $http({
          method: 'POST',
          url: 'http://localhost:3000/api/v1/login/recover',
          data: user
        });
      },

      registerUser: function(){
        alert('registrado');
      },

      getMisCursos: function(user){
        return $http({
          method: 'GET',
          url: 'http://localhost:3000/api/v1/users/'+user+'/cursos',
          data: user
        });
      },

      getMisCatedras: function(user){
        return $http({
          method: 'GET',
          url: 'http://localhost:3000/api/v1/users/'+user+'/cursos',
          data: user
        });
      },

      // logout
    }
  });