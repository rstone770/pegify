var path = require('path');

/**
 * Register watch task.
 *
 * @param {!Gulp} gulp
 * @param {!Object} object
 */
var register = function (gulp, config) {
  var paths = config.paths.buildable().map(function (value) {
    return path.join(value, '**/*.*');
  });

  gulp.task('watch', function () {
    gulp.watch(paths, ['default']);
  });
};

module.exports = register;
