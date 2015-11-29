var RcLoader = require('rcloader');

/**
 * Returns a runtime config closest to path.
 *
 * @param  {!String} path
 * @return {!Object}
 */
module.exports = function (path) {
  var loader = new RcLoader('.pegjsrc');

  return loader.for(path);
};
