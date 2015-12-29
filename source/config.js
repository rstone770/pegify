var RcLoader = require('rcloader');

var loader = new RcLoader('.pegjsrc');

/**
 * Returns a runtime config closest to path.
 *
 * @param  {!String} path
 * @return {!Object}
 */
var config = function (path) {
  return loader.for(path);
};

module.exports = config;
