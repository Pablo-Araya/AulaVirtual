'use strict';

/**
 * @ngdoc service
 * @name AulaVirtualApp.recover
 * @description
 * # recover
 * Service in the AulaVirtualApp.
 */
angular.module('AulaVirtualApp')
  .service('recover', function ($http) {
    // AngularJS will instantiate a singleton by calling "new" on this function

    return {
      recoverPass: function(user){
        return $http({
          method: 'POST',
          url: 'http://localhost:3000/api/v1/login/recover',
          data: user
        });
      }
    }
  });