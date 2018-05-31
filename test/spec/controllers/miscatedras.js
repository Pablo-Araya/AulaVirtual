'use strict';

describe('Controller: MiscatedrasCtrl', function () {

  // load the controller's module
  beforeEach(module('AulaVirtualApp'));

  var MiscatedrasCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    MiscatedrasCtrl = $controller('MiscatedrasCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(MiscatedrasCtrl.awesomeThings.length).toBe(3);
  });
});
