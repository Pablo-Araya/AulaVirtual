'use strict';

describe('Service: AuthLoginService', function () {

  // load the service's module
  beforeEach(module('AulaVirtualApp'));

  // instantiate service
  var AuthLoginService;
  beforeEach(inject(function (_AuthLoginService_) {
    AuthLoginService = _AuthLoginService_;
  }));

  it('should do something', function () {
    expect(!!AuthLoginService).toBe(true);
  });

});
