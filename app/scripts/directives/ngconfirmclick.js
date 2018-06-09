'use strict';

/**
 * @ngdoc directive
 * @name AulaVirtualApp.directive:ngConfirmClick
 * @description
 * # ngConfirmClick
 */
angular.module('AulaVirtualApp')
  .directive('ngConfirmClick', [
    function(){
        return {
            link: function (scope, element, attr) {
                var msg = attr.ngConfirmClick || "Está Seguro?";
                var clickAction = attr.confirmedClick;
                element.on('click',function (event) {
                    if ( window.confirm(msg) ) {
                        scope.$eval(clickAction)
                    }
                });
            }
        };
  }]);