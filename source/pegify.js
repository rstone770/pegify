var _ = require('lodash'),
    path = require('path'),
    pegjs = require('pegjs'),
    through = require('through');

/**
 * Pegify
 *
 * @param {Object=} options
 */
var Pegify = function (options) {

  /**
   * Pegjs options.
   *
   * @type {Object}
   */
  this._options = _.extend({}, Pegify.DEFAULT_OPTIONS, options, Pegify.STATIC_OPTIONS);

  /**
   * Pre digested extensions that should be supported by pegify.
   *
   * @type {Object}
   */
  this._extensions = Pegify.getExtensions(this._options);
};

/**
 * Default options that are set if a value is not provided by the user.
 *
 * @type {Object}
 */
Pegify.DEFAULT_OPTIONS = {
  export: 'module.exports'
};

/**
 * Default extensions that are supported by pegify.
 *
 * @type {Array}
 */
Pegify.DEFAULT_EXTENSIONS = [
  '.peg',
  '.pegjs'
];

/**
 * Pegjs options that cannot be changed by the user.
 *
 * @type {Object}
 */
Pegify.STATIC_OPTIONS = {
  output: 'source'
};

/**
 * Pegify factory. Allows fluid syntax.
 *
 * @param  {Object=} options
 * @return {!Pegify}
 */
Pegify.create = function (options) {
  return new Pegify(options);
};

/**
 * Returns a list of extensions passed through an options map.
 *
 * @param  {Object} options
 * @return {!Array<String>}
 */
Pegify.getExtensions = function (options) {
  var result = Pegify.DEFAULT_EXTENSIONS;

  if (_.isObject(options)) {
    var extensions = _.result(options, 'extensions');

    if (_.isArray(extensions)) {
      result = extensions;
    }
  }

  return _.chain(result)
    .each(_.trim)
    .filter(_.isString)
    .map(function (value) {
      var extension = value.toLowerCase();

      if (extension.indexOf('.') !== 0) {
        extension = '.' + value;
      }

      return extension;
    })
    .value();
};

/**
 * Compiles peg into a commonjs module.
 *
 * @param  {!String} content
 * @return {!String}
 */
Pegify.prototype.compile = function (content) {
  return this._options.export + '=' + pegjs.generate(content, this._options);
};

/**
 * Determins if a filename contains a extension supported by pegify.
 *
 * @param  {!String}  filename
 * @return {!Boolean}
 */
Pegify.prototype.isExtensionSupported = function (filename) {
  var extension = path.extname(filename).toLowerCase();

  return _.contains(this._extensions, extension);
};

/**
 * Creates a transform stream.
 *
 * @param  {!String} file
 * @return {!Stream}
 */
Pegify.prototype.toTransform = function (file) {
  var self = this;

  var transform = function (file) {
    if (!self.isExtensionSupported(file)) {
      return through();
    }

    var buffer = '';

    var write = function (chunk) {
      buffer += chunk;
    };

    var end = function () {
      this.queue(self.compile(buffer));
      this.queue(null);
    };

    return through(write, end);
  };

  return transform(file);
};

module.exports = Pegify;
