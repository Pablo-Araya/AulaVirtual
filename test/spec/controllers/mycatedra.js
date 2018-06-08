'use strict';

describe('Controller: MycatedraCtrl', function () {

  // load the controller's module
  beforeEach(module('AulaVirtualApp'));

  var MycatedraCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    MycatedraCtrl = $controller('MycatedraCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(MycatedraCtrl.awesomeThings.length).toBe(3);
  });
});
