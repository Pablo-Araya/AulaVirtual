'use strict';

describe('Filter: capitalizeFilter', function () {

  // load the filter's module
  beforeEach(module('AulaVirtualApp'));

  // initialize a new instance of the filter before each test
  var capitalizeFilter;
  beforeEach(inject(function ($filter) {
    capitalizeFilter = $filter('capitalizeFilter');
  }));

  it('should return the input prefixed with "capitalizeFilter filter:"', function () {
    var text = 'angularjs';
    expect(capitalizeFilter(text)).toBe('capitalizeFilter filter: ' + text);
  });

});
