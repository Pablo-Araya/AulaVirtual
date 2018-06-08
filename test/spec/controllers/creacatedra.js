'use strict';

describe('Controller: CreacatedraCtrl', function () {

  // load the controller's module
  beforeEach(module('AulaVirtualApp'));

  var CreacatedraCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    CreacatedraCtrl = $controller('CreacatedraCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(CreacatedraCtrl.awesomeThings.length).toBe(3);
  });
});
