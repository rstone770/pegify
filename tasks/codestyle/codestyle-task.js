var jscs = require('gulp-jscs'),
    path = require('path');

/**
 * Registers the code style task. All code style configuration options are
 * located in the .jscsrc file in the root of the project.
 *
 * @param {!Gulp} gulp
 * @param {!Object} config
 */
var register = function (gulp, config) {
  var paths = config.paths.buildable().map(function (value) {
    return path.join(value, '**/*.js');
  });

  gulp.task('codestyle', function () {
    return gulp.src(paths)
      .pipe(jscs())
      .pipe(jscs.reporter());
  });
};

module.exports = register;
