'use strict';

/**
 * @ngdoc filter
 * @name AulaVirtualApp.filter:capitalizeFilter
 * @function
 * @description
 * # capitalizeFilter
 * Filter in the AulaVirtualApp.
 */
angular.module('AulaVirtualApp')
  .filter('capitalize', function () {
    return function (input) {
      return (!!input) ? input.charAt(0).toUpperCase() + input.substr(1).toLowerCase() : '';
    };
  })
  .filter('capitalizeEach', function () {
    return function (input) {
      return (!!input) ? input.split(' ').map(function(wrd){return wrd.charAt(0).toUpperCase() + wrd.substr(1).toLowerCase();}).join(' ') : '';
    };
  });