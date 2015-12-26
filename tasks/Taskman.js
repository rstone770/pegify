require('colors');

var glob = require('glob'),
    gutil = require('gulp-util'),
    path = require('path');

/**
 * Task api that configures and loads gulp tasks.
 *
 * @param {!Gulp} gulp
 * @param {String=} cwd
 * @param {Object=} config
 */
var Taskman = function (gulp, cwd, config) {

  /**
   * Configuration options that will be injected into every gulp task.
   *
   * @type {Object}
   */
  this._config = config || {},

  /**
   * Current working directory that path calculations should be relative to.
   *
   * @type {String}
   */
  this._cwd = cwd || __dirname;

  /**
   * Actual path of this file relative to the defined working directory.
   *
   * @type {String}
   */
  this._root = path.relative(this._cwd, __dirname);

  /**
   * Gulp instance. All tasks get injected the same gulp instances.
   *
   * @type {Gulp}
   */
  this._gulp = gulp;
};

/**
 * Taskman factory.
 *
 * @param {!Gulp} gulp
 * @param {String=} cwd
 * @param {Object=} config
 * @return {!TaskMan}
 */
Taskman.create = function (gulp, cwd, config) {
  return new this(gulp, cwd, config);
};

/**
 * Loads a task or tasks, injecting a configuration.
 *
 * @throws Error if path is not a string.
 *
 * @param  {!String} path
 * @return {!TaskMan}
 */
Taskman.prototype.load = function (path) {
  if (typeof path !== 'string') {
    throw new Error('path must be a string.');
  }

  gutil.log('Scanning ' + path.magenta + ' for tasks.');

  glob.sync(path, {
    cwd: this._cwd
  }).forEach(this._load.bind(this));

  return this;
};

/**
 * Loads a single task from a fully quilified path.
 *
 * @param  {!String} task
 */
Taskman.prototype._load = function (task) {
  gutil.log('Found task ' + task.magenta);

  var module = require('./' + path.relative(this._root, task));

  if (typeof module === 'function') {
    module.call(null, this._gulp, this._config);
  } else {
    gutil.log('Could not mount task '.red + task.red);
  }
};

module.exports = Taskman;
