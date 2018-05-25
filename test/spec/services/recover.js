'use strict';

describe('Service: recover', function () {

  // load the service's module
  beforeEach(module('AulaVirtualApp'));

  // instantiate service
  var recover;
  beforeEach(inject(function (_recover_) {
    recover = _recover_;
  }));

  it('should do something', function () {
    expect(!!recover).toBe(true);
  });

});
