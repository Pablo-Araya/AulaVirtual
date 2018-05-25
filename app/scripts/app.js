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
    'ngTouch'
    // 'frapontillo.bootstrap-switch'
  ])
  .config(function ($routeProvider, $locationProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .when('/plantilla', {
        templateUrl: 'views/plantilla.html',
        controller: 'PlantillaCtrl',
        controllerAs: 'plantilla'
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
      .otherwise({
        redirectTo: '/'
      });
      $locationProvider.html5Mode(true)
  });
