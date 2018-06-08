'use strict';

describe('Controller: EnrolledclaseCtrl', function () {

  // load the controller's module
  beforeEach(module('AulaVirtualApp'));

  var EnrolledclaseCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    EnrolledclaseCtrl = $controller('EnrolledclaseCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(EnrolledclaseCtrl.awesomeThings.length).toBe(3);
  });
});
