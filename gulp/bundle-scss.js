var gulp = require('gulp'),
    sass = require('gulp-sass'),
    sourcemaps = require('gulp-sourcemaps'),
    livereload = require('gulp-livereload');
    normalize = require('node-normalize-scss'),
    neat = require('node-neat');

function bundleCss(src, dest) {
  return function() {
    gulp.src(src)
      .pipe(sourcemaps.init())
      .pipe(sass({
        includePaths: [].concat(normalize.includePaths, neat.includePaths),
        sourceMap: true,
        error: function(error) {
          console.log(error);
        },
        outputStyle: 'compressed',
        // outputStyle: 'expanded',
      }))
      .pipe(sourcemaps.write())
      .pipe(gulp.dest(dest))
      .pipe(livereload());
  }
}
module.exports = bundleCss;
