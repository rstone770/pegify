var fs = require('fs'),
    mocha = require('gulp-mocha'),
    path = require('path');

/**
 * Register the testing task. Mocha configuration can be found in the .mocharc
 * in the root of the project.
 *
 * @param {!Gulp} gulp
 * @param {!Object} config
 */
var register = function (gulp, config) {
  var rc = JSON.parse(fs.readFileSync(path.join(config.root, '.mocharc')).toString());

  gulp.task('test', function () {
    return gulp.src(path.join(config.paths.tests, '**/*-test.js'))
      .pipe(mocha(rc));
  });
};

module.exports = register;
