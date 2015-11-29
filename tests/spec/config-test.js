var expect = require('chai').expect,
    fixture = require('../fixtures'),
    config = require('../../source/config');

describe('config', function () {
  it('should load closest .pegjsrc to path..', function () {
    expect(config('/')).to.be.empty;
    expect(config(fixture.path('config/deep/deeper'))).to.deep.equal({key: 'value'});
    expect(config(fixture.path('config/foo/bar'))).to.deep.equal({key: 'other'});
  });
});
