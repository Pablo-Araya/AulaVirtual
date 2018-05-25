'use strict';

describe('Controller: PlantillaCtrl', function () {

  // load the controller's module
  beforeEach(module('miPaginaApp'));

  var PlantillaCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    PlantillaCtrl = $controller('PlantillaCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(PlantillaCtrl.awesomeThings.length).toBe(3);
  });
});
