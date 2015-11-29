var _ = require('lodash'),
    config = require('./config'),
    Pegify = require('./pegify');

/**
 * Pegify transform factory.
 *
 * A stream will be created if the file argument is a string, otherwise a
 * configured factory is returned using the file argument as an options map.
 *
 * @param  {(String | Object)=} file
 * @param  {Object=} options
 * @return {!(Stream | Function)}
 */
var factory = function (file, options) {
  if (!_.isString(file)) {
    options = file;

    return function (file) {
      return factory(file, options);
    };
  }

  return Pegify.create(
    _.extend({}, config(file), options)
  ).toTransform(file);
};

module.exports = factory;
