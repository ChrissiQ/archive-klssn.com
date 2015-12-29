var gulp = require('gulp'),
    watch = require('gulp-watch'),
    livereload = require('gulp-livereload'),

    bundleCss = require('./gulp/bundle-scss'),
    bundleJs = require('./gulp/bundle-js'),
    autoReload = require('./gulp/auto-reload'),
    c = require('./gulp/config');

gulp.task('js:watch', function() {
  return bundleJs(true, c.js.src, c.js.dest, c.js.file);
});
gulp.task('js', function() {
  return bundleJs(false, c.js.src, c.js.dest, c.js.file);
});
gulp.task('sass:watch', function() {
  watch(c.css.src, {}, bundleCss(c.css.src, c.css.dest));
});
gulp.task('app:watch', function() {
  gulp.watch(c.app.src).on('change', livereload.changed);
});
gulp.task('watch', ['sass:watch', 'js:watch', 'app:watch'], function() {
  livereload.listen();
});
gulp.task('default', function() {
  autoReload('watch');
});
