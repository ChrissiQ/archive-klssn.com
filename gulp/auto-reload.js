var watch = require('gulp-watch'),
    spawn = require('child_process').spawn;

function autoReload(task) {
  // Restarts the default task each time gulpfile.js is changed.
  // Allows changes to the gulpfile while still watching files.
  var p;

  watch(['./gulp/**/*.js', 'gulpfile.js'], {}, spawnChildren);
  spawnChildren();

  function spawnChildren(e) {
    if (p) {
      p.kill();
    }
    p = spawn('gulp', [task], {stdio: 'inherit'});
  }
}

module.exports = autoReload;
