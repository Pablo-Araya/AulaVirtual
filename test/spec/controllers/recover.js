'use strict';

describe('Controller: RecoverCtrl', function () {

  // load the controller's module
  beforeEach(module('AulaVirtualApp'));

  var RecoverCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    RecoverCtrl = $controller('RecoverCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(RecoverCtrl.awesomeThings.length).toBe(3);
  });
});
