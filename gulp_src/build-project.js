var buildConfig      = require('../build.config');
var gulp        = require('gulp');
var runSequence = require('run-sequence');
var chalk       = require('chalk');
var connect     = require('gulp-connect');


buildArgs = {
    stage1: ['clean-all'],
    stage2: ['git-commit', 'copy-assets', 'build-styles'],
    //stage3: ['inject-html']
};

gulp.task('build', function(done) {
  var buildStart;
  buildStart = Date.now();

  runSequence(buildArgs.stage1, buildArgs.stage2, function() {
    var diff = String((Date.now() - buildStart) / 1000);
    console.log(chalk.white.bgGreen('[GULP] Build sequence had been completed successfully in ' + chalk.white.bgGreen(diff + chalk.white.bgGreen('s!'))));
    return done();
  });
});

gulp.task('watch', function(done) {
    console.log(chalk.white.bgGreen('[GULP] Starting watch and build task'));
    runSequence('build', 'watchers', function() {
        console.log(chalk.white.bgGreen('[GULP] Watchers had been turned on'));
        return done();
    });
});

