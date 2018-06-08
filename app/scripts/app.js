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
      .when('/misCursos/:id', {
        templateUrl: 'views/enrolledcurso.html',
        controller: 'EnrolledCursoCtrl',
        controllerAs: 'enrolledCurso'
      })
      .when('/misCursos/:id/clase/:claseId', {
        templateUrl: 'views/enrolledclase.html',
        controller: 'EnrolledClaseCtrl',
        controllerAs: 'enrolledClase'
      })
      .when('/misCatedras', {
  	  templateUrl: 'views/miscatedras.html',
  	  controller: 'MisCatedrasCtrl',
  	  controllerAs: 'misCatedras'
  	  })
      .when('/misCatedras/crearCatedra', {
        templateUrl: 'views/crearcatedra.html',
        controller: 'CrearCatedraCtrl',
        controllerAs: 'crearCatedra'
      })
      .when('/misCatedras/:id', {
        templateUrl: 'views/mycatedra.html',
        controller: 'MyCatedraCtrl',
        controllerAs: 'myCatedra'
      })
      .when('/misCatedras/:id/crearClase', {
        templateUrl: 'views/crearclase.html',
        controller: 'CrearClaseCtrl',
        controllerAs: 'crearClase'
      })
      .when('/misCatedras/:id/myClase/:claseId', {
        templateUrl: 'views/myclase.html',
        controller: 'MyClaseCtrl',
        controllerAs: 'myClase'
      })
      .when('/categoria/:id', {
        templateUrl: 'views/categoria.html',
        controller: 'CategoriaCtrl',
        controllerAs: 'categoria'
      })
      .when('/error', {
        templateUrl: 'views/error.html',
        controller: 'ErrorCtrl',
        controllerAs: 'error'
      })
      .when('/admin/users', {
        templateUrl: 'views/adminusers.html',
        controller: 'AdminUsersCtrl',
        controllerAs: 'adminUsers'
      })
      .when('/admin/categories', {
        templateUrl: 'views/admincategories.html',
        controller: 'AdminCategoriesCtrl',
        controllerAs: 'adminCategories'
      })   
      .otherwise({
        redirectTo: '/'
      });
      $locationProvider.html5Mode(true)
  });