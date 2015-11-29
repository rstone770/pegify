var expect = require('chai').expect,
    Stream = require('stream'),
    factory = require('../../source');

describe('factory', function () {
  it('should be a callable.', function () {
    expect(factory).to.be.a('function');
  });

  it('should return a factory when a file name is not provided.', function () {
    expect(factory()).to.be.a('function');
    expect(factory({})).to.be.a('function');
  });

  it('should return a transform when a file name is provided.', function () {
    expect(factory('file.js')).to.be.instanceof(Stream);
    expect(factory('file.js', {})).to.be.instanceof(Stream);
  });
});
