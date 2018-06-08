'use strict';

describe('Controller: CrearclaseCtrl', function () {

  // load the controller's module
  beforeEach(module('AulaVirtualApp'));

  var CrearclaseCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    CrearclaseCtrl = $controller('CrearclaseCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(CrearclaseCtrl.awesomeThings.length).toBe(3);
  });
});
