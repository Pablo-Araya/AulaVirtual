'use strict';

describe('Controller: CursosCtrl', function () {

  // load the controller's module
  beforeEach(module('AulaVirtualApp'));

  var CursosCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    CursosCtrl = $controller('CursosCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(CursosCtrl.awesomeThings.length).toBe(3);
  });
});
