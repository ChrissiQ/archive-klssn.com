var gulp = require('gulp'),
    sass = require('gulp-sass'),
    normalize = require('node-normalize-scss'),
    neat = require('node-neat');

var sassConfig = {
  includePaths: [].concat(normalize.includePaths, neat.includePaths),
  error: function(error) {
    console.log(error);
  },
  outputStyle: 'compressed',
};

function bundleCss(src, dest) {
  return function() {
    if (process.env.NODE_ENV === 'development') {

      var sourcemaps = require('gulp-sourcemaps'),
          livereload = require('gulp-livereload');
      sassConfig.sourceMap = true;

      gulp.src(src)
        .pipe(sourcemaps.init())
        .pipe(sass(sassConfig))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(dest))
        .pipe(livereload());

    } else {
      gulp.src(src)
        .pipe(sass(sassConfig))
        .pipe(gulp.dest(dest));
    }
  }
}
module.exports = bundleCss;
