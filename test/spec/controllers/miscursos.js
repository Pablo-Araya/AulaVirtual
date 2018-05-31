'use strict';

describe('Controller: MiscursosCtrl', function () {

  // load the controller's module
  beforeEach(module('AulaVirtualApp'));

  var MiscursosCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    MiscursosCtrl = $controller('MiscursosCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(MiscursosCtrl.awesomeThings.length).toBe(3);
  });
});
