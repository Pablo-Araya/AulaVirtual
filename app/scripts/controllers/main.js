'use strict';

/**
 * @ngdoc function
 * @name AulaVirtualApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the AulaVirtualApp
 */
angular.module('AulaVirtualApp')
  .controller('MainCtrl', function ($scope, $location, userService, authService) {
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

    var FormLoginVal = function() {
        var handleKeys = function() {
            $("#username").bind('keyup blur',function(){ 
                var node = $(this);
                node.val(node.val().replace(/[^a-zA-Z]/g,'') ); 
            })
        }

        var handleTrim = function(){
            $(".input-login-control").blur(function() {
                $(this).val($.trim($(this).val()));
            })
        }

        return {
            init: function () {

                handleKeys();
                handleTrim();

            }
        }
    }();

    $(function() {
        FormLoginVal.init();
    });

    $scope.user = {}
    $scope.token = {}

    $scope.userLogin = function(){
        if($scope.user.username == undefined || $scope.user.password == undefined) {
            $scope.user.error = "Nombre de Usuario y Password son requeridos";
            $scope.user.success = undefined;
            $(".input-login-control").each(function() {
                var el = $(this);
                if (el.val() == "") {
                    $(el.data("div-parent")).addClass("has-error");
                }
            });
        } else {
            userService.loginUser($scope.user)
            .then(
                function(response) {
                    var res = response.data.data;
                    $scope.user.error = undefined;
                    $scope.user.success = "OK";
                    $scope.user.person = res.nombre + " " + res.lastName;
                    $("#usernameGroup,#passwordGroup").removeClass("has-error has-success");
                    $scope.token.id = res.id;
                    userService.usuario = res;
                    userService.person = $scope.user.person;
                    authService.show = true;
                    authService.createToken($scope.token);
                    $location.path( "/login" );
                },
                function() { // optional
                    $scope.user.error = "Usuario y/o Clave inválida";
                    $scope.user.success = undefined;
                    $("#usernameGroup,#passwordGroup").removeClass("has-error has-success");
                }
            );
            console.log($scope.user);
        }
    }

    $scope.userRecover = function(){
        $location.path( "/recover" );
    }

    $scope.userRegister = function(){
        $location.path( "/register" );
    }

  });