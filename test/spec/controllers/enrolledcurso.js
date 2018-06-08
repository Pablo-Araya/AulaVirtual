'use strict';

describe('Controller: EnrolledcursoCtrl', function () {

  // load the controller's module
  beforeEach(module('AulaVirtualApp'));

  var EnrolledcursoCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    EnrolledcursoCtrl = $controller('EnrolledcursoCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(EnrolledcursoCtrl.awesomeThings.length).toBe(3);
  });
});
