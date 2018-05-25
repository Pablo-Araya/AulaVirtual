'use strict';

/**
 * @ngdoc service
 * @name AulaVirtualApp.user
 * @description
 * # user
 * Service in the AulaVirtualApp.
 */
angular.module('AulaVirtualApp')
  .service('user', function ($http) {
    // AngularJS will instantiate a singleton by calling "new" on this function

    return {
      agregarUser: function(user){
        return $http({
          method: 'POST',
          url: 'http://localhost:3000/api/v1/login',
          data: user
        });
      }
    }
  });