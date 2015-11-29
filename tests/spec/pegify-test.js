var expect = require('chai').expect,
    Stream = require('stream'),
    fixture = require('../fixtures'),
    Pegify = require('../../source/pegify');

describe('Pegify', function () {

  /**
   * PegJS fixture data.
   *
   * @return {String}
   */
  var peg = fixture.read('pegify/peg');

  /**
   * Buffer a readable stream until end of stream.
   *
   * @param  {!Stream}   stream
   * @param  {!Function} done
   */
  var read = function (stream, done) {
    var buffer = '';

    stream.on('data', function (chunk) {
      buffer += chunk;
    });

    stream.once('end', function () {
      done(buffer);
    });
  };

  /**
   * Write data and immediatly end stream.
   *
   * @param  {!Stream} stream
   * @param  {!String} data
   */
  var write = function (stream, data) {
    stream.write(data);
    stream.end();
  };

  /**
   * Asserts that a collection is a set of default extensions.
   *
   * @param  {Array} extensions [description]
   */
  var expectDefaultExtensions = function (extensions) {
    expectExtensionsEqual(['.peg', '.pegjs'], extensions);
  };

  /**
   * Asserts that expected extensions are equal to actual.
   *../fixtures/
   * @param  {!Array} expected [description]
   * @param  {!Array} actual   [description]
   */
  var expectExtensionsEqual = function (expected, actual) {
    expect(actual).to.have.length(expected.length);

    expected.forEach(function (value) {
      expect(actual).to.contain(value);
    });
  };

  describe('create', function () {
    it('should create a Pegify instance.', function () {
      expect(Pegify.create()).to.be.instanceof(Pegify);
    });
  });

  describe('getExtensions', function () {
    it('should return a list of default extensions on invalid arguments.', function () {
      expectDefaultExtensions(Pegify.getExtensions());
      expectDefaultExtensions(Pegify.getExtensions({}));
      expectDefaultExtensions(Pegify.getExtensions({extension: []}));
    });

    it('should return a list of valid extensions.', function () {
      expectExtensionsEqual(
        ['.a', '.ext'],
        Pegify.getExtensions({
          extensions: [
            'a',
            null,
            1,
            '.exT'
          ]}));
    });
  });

  describe('#compile', function () {
    it('should compile a peg string with an export option.', function () {
      var compiled = Pegify.create({export: 'WOLOLO'}).compile(peg);

      expect(compiled).to.have.string('WOLOLO=');
    });
  });

  describe('#isExtensionSupported', function () {
    it('should support .peg/.pegjs extensions by default.', function () {
      var pegify = Pegify.create();

      expect(pegify.isExtensionSupported('some/path/file.js')).to.be.false;
      expect(pegify.isExtensionSupported('some/path/file.peg')).to.be.true;
      expect(pegify.isExtensionSupported('some/path/file.pegjs')).to.be.true;
    });

    it('should support extensions from options.', function () {
      var pegify = Pegify.create({extensions: ['.foo', '.bar']});

      expect(pegify.isExtensionSupported('some/path/file.js')).to.be.false;
      expect(pegify.isExtensionSupported('some/path/file.foo')).to.be.true;
      expect(pegify.isExtensionSupported('some/path/file.bar')).to.be.true;
    });
  });

  describe('#toTransform', function () {
    it('should return a stream.', function () {
      expect(Pegify.create().toTransform('somefile')).to.be.instanceof(Stream);
    });

    it('should return a stream that can transform supported peg extensions to js.', function (done) {
      var transform = Pegify.create({extensions: ['.foo']}).toTransform('file.foo');

      read(transform, function (data) {
        expect(data).to.be.equal(fixture.read('pegify/compiled'));

        done();
      });

      write(transform, peg);
    });

    it('should not transform non supported extensions.', function (done) {
      var transform = Pegify.create({extensions: ['.foo']}).toTransform('file.js');

      read(transform, function (data) {
        expect(data).to.be.equal(peg);

        done();
      });

      write(transform, peg);
    });
  });
});
