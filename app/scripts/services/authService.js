'use strict';

/**
 * @ngdoc service
 * @name AulaVirtualApp.auth
 * @description
 * # auth
 * Service in the AulaVirtualApp.
 */
angular.module('AulaVirtualApp')
  .service('authService', function ($http) {
    // AngularJS will instantiate a singleton by calling "new" on this function

    return {
        
        createToken: function(user){
            var token = "";
            var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789$%&/()=?¡¿!";

            for (var i = 0; i < 200; i++){
                token += possible.charAt(Math.floor(Math.random() * possible.length));
            }

            this.token_security = token;
            this.userId = user.id;
            user.token_security = token;

            return $http({
                method: 'POST',
                url: 'http://localhost:3000/api/v1/users/'+user.id+'/auth',
                data: user
            });
        },

        compareToken: function(user){
            return $http({
                method: 'GET',
                url: 'http://localhost:3000/api/v1/users/'+user+'/auth',
                data: user
            });
        },

        destroyToken: function(user){
            return $http({
                method: 'DELETE',
                url: 'http://localhost:3000/api/v1/users/'+user+'/auth',
                data: user
            });
        }
 
    }

  });
