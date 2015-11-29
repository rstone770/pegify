var gutil = require('gulp-util'),
    path = require('path'),
    pkg = require('./package.json');

var config = {

  /**
   * Notable project paths.
   *
   * @type {Object}
   */
  paths: {
    bin: path.join(__dirname, './bin'),
    source: path.join(__dirname, './source'),
    tasks: path.join(__dirname, './tasks'),
    tests: path.join(__dirname, './tests'),

    /**
     * Returns a list of paths that are not related to build artifacts.
     *
     * @return {Array<String>}
     */
    buildable: function () {
      return [
        this.source,
        this.tasks,
        this.tests
      ];
    }
  },

  /**
   * Project root path.
   *
   * @type {String}
   */
  root: __dirname
};

module.exports = config;
