var gulp = require('gulp'),
    gutil = require('gulp-util'),
    notify = require('gulp-notify'),
    sourcemaps = require('gulp-sourcemaps'),
    livereload = require('gulp-livereload'),
    watchify = require('watchify'),
    browserify = require('browserify'),
    source = require('vinyl-source-stream'),
    buffer = require('vinyl-buffer'),
    path = require('path');

function bundleJs(watch, src, dest, file) {
  var props = watchify.args;
  props.entries = [path.join(src, file)];
  props.debug = true;
  var bundler = watch ? watchify(browserify(props)) : browserify(props);
  function rebundle() {
    var stream = bundler.bundle();
    return stream.on('error', notify.onError({
      title: "Compile Error",
      message: "<%= error.message %>"
    }))
    .pipe(source(file))
    .pipe(buffer())
    .pipe(sourcemaps.init({loadMaps: true}))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest(dest))
    .pipe(livereload());
  }
  bundler.on('update', function() {
    rebundle();
    gutil.log('Rebundle...');
  });
  return rebundle();
}
module.exports = bundleJs;
