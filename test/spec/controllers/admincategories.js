'use strict';

describe('Controller: AdmincategoriesCtrl', function () {

  // load the controller's module
  beforeEach(module('AulaVirtualApp'));

  var AdmincategoriesCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    AdmincategoriesCtrl = $controller('AdmincategoriesCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(AdmincategoriesCtrl.awesomeThings.length).toBe(3);
  });
});
