var expect = require('chai').expect,
    fixture = require('../fixtures'),
    config = require('../../source/config');

describe('config', function () {
  it('should load a .pegjsrc file to path.', function () {
    var empty = config('/'),
        values = config(fixture.path('config/deep/deeper'));

    expect(empty).to.be.empty;
    expect(values).to.deep.equal({key: 'value'});
  });
});
