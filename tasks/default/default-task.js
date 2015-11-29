/**
 * Registers default taks.
 *
 * @param {!Gulp} gulp
 * @param {!Object} config
 */
var register = function (gulp, config) {
  gulp.task('default', ['lint', 'codestyle']);
};

module.exports = register;
