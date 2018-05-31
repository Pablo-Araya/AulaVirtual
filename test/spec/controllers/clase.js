'use strict';

describe('Controller: ClaseCtrl', function () {

  // load the controller's module
  beforeEach(module('AulaVirtualApp'));

  var ClaseCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ClaseCtrl = $controller('ClaseCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(ClaseCtrl.awesomeThings.length).toBe(3);
  });
});
