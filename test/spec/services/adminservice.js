'use strict';

describe('Service: adminService', function () {

  // load the service's module
  beforeEach(module('AulaVirtualApp'));

  // instantiate service
  var adminService;
  beforeEach(inject(function (_adminService_) {
    adminService = _adminService_;
  }));

  it('should do something', function () {
    expect(!!adminService).toBe(true);
  });

});
