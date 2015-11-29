var lint = require('gulp-jshint'),
    path = require('path');

/**
 * Register the linting task. All linting configuration options
 * are found in .jshintrc in the root of the project.
 *
 * @param {!Gulp} gulp
 * @param {!Object} config
 */
var register = function (gulp, config) {
  var paths = config.paths.buildable().map(function (value) {
    return path.join(value, '**/*.js');
  });

  gulp.task('lint', function () {
    return gulp.src(paths)
      .pipe(lint())
      .pipe(lint.reporter('default'));
  });
};

module.exports = register;
