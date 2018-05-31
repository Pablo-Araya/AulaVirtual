'use strict';

/**
 * @ngdoc overview
 * @name AulaVirtualApp
 * @description
 * # AulaVirtualApp
 *
 * Main module of the application.
 */
angular
  .module('AulaVirtualApp', [
    'ngAnimate',
    'ngAria',
    'ngCookies',
    'ngMessages',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'bootstrap.angular.validation'
    // 'frapontillo.bootstrap-switch'
  ])
  .config(function ($routeProvider, $locationProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .when('/footer', {
        templateUrl: 'views/footer.html',
        controller: 'FooterCtrl',
        controllerAs: 'footer'
      })
      .when('/header', {
        templateUrl: 'views/header.html',
        controller: 'HeaderCtrl',
        controllerAs: 'header'
      })
      .when('/recover', {
        templateUrl: 'views/recover.html',
        controller: 'RecoverCtrl',
        controllerAs: 'recover'
      })
      .when('/register', {
        templateUrl: 'views/register.html',
        controller: 'RegisterCtrl',
        controllerAs: 'register'
      })
      .when('/login', {
        templateUrl: 'views/login.html',
        controller: 'LoginCtrl',
        controllerAs: 'login'
      })
      .when('/logout', {
        templateUrl: 'views/logout.html',
        controller: 'LogoutCtrl',
        controllerAs: 'logout'
      })
      .when('/misCursos', {
        templateUrl: 'views/miscursos.html',
        controller: 'MisCursosCtrl',
        controllerAs: 'misCursos'
      })
      .when('/misCatedras', {
	  templateUrl: 'views/miscatedras.html',
	  controller: 'MisCatedrasCtrl',
	  controllerAs: 'misCatedras'
	  })
      .when('/categoria/:id', {
        templateUrl: 'views/categoria.html',
        controller: 'CategoriaCtrl',
        controllerAs: 'categoria'
      })
      .when('/catedra', {
        templateUrl: 'views/catedra.html',
        controller: 'CatedraCtrl',
        controllerAs: 'catedra'
      })
      .when('/clase', {
        templateUrl: 'views/clase.html',
        controller: 'ClaseCtrl',
        controllerAs: 'clase'
      })
      .when('/error', {
        templateUrl: 'views/error.html',
        controller: 'ErrorCtrl',
        controllerAs: 'error'
      })
      .otherwise({
        redirectTo: '/'
      });
      $locationProvider.html5Mode(true)
  });