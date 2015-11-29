var _ = require('lodash'),
    fs = require('fs'),
    path = require('path');

/**
 * Fixture helper.
 *
 * @param {String=} cwd
 */
var Fixture = function (cwd) {
  this._cwd = cwd || __dirname;
};

/**
 * Fixture helper factory.
 *
 * @param  {String=} cwd
 * @return {!Fixture}
 */
Fixture.create = function (cwd) {
  return new Fixture(cwd);
};

/**
 * Resolves a path relative to cwd.
 *
 * @param  {!String} to
 * @return {!String}
 */
Fixture.prototype.path = function (to) {
  return path.resolve(this._cwd, to);
};

/**
 * Reads a fixture file relative to cwd.
 *
 * @param  {!String} file
 * @return {!String}
 */
Fixture.prototype.read = function (file) {
  return fs.readFileSync(this.path(file)).toString('utf8');
};

module.exports = _.extend(Fixture.create(), {
  Fixture: Fixture
});
