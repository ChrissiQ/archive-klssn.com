var gulp = require('gulp'),
    browserify = require('browserify'),
    source = require('vinyl-source-stream'),
    path = require('path');

function bundle(src, dest, file) {
  return browserify({entries: [path.join(src, file)]})
    .bundle()
    .pipe(source(file))
    .pipe(gulp.dest(dest));
}

function bundleWatch(watch, src, dest, file) {

  var watchify = require('watchify'),
      notify = require('gulp-notify'),
      gutil = require('gulp-util');

  var props = watchify.args;
  props.entries = [path.join(src, file)];
  props.debug = true;

  var bundler = watch ? watchify(browserify(props)) : browserify(props);

  function rebundle() {
    var stream = bundler.bundle();

    if (process.env.NODE_ENV === 'development') {
      var buffer = require('vinyl-buffer'),
          sourcemaps = require('gulp-sourcemaps'),
          livereload = require('gulp-livereload');
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

    } else {
      return stream.on('error', notify.onError({
        title: "Compile Error",
        message: "<%= error.message %>"
      }))
      .pipe(source(file))
      .pipe(gulp.dest(dest));
    }
  }
  bundler.on('update', function() {
    rebundle();
    gutil.log('Rebundle...');
  });
  return rebundle();
}

module.exports = {
  bundle: bundle,
  bundleWatch: bundleWatch
};
