'use strict';

describe('Service: CatedraService', function () {

  // load the service's module
  beforeEach(module('AulaVirtualApp'));

  // instantiate service
  var CatedraService;
  beforeEach(inject(function (_CatedraService_) {
    CatedraService = _CatedraService_;
  }));

  it('should do something', function () {
    expect(!!CatedraService).toBe(true);
  });

});
