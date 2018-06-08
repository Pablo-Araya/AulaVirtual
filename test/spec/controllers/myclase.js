'use strict';

describe('Controller: MyclaseCtrl', function () {

  // load the controller's module
  beforeEach(module('AulaVirtualApp'));

  var MyclaseCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    MyclaseCtrl = $controller('MyclaseCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(MyclaseCtrl.awesomeThings.length).toBe(3);
  });
});
