var buildConfig = require('../build.config');
var gulp        = require('gulp');
var runSequence = require('run-sequence');
var watch       = require('gulp-watch');
var chalk       = require('chalk');

gulp.task('watchers', function() {
  var jsWatchArgs = {
    source: buildConfig.app_files.js,
    tasks: ['transpile-scripts']
  };

  //if (arguments.tests) {
   // jsWatchArgs.tasks.push('run-tests-watch');
   // jsWatchArgs.source = config.build.app_files.all_coffee;
  //}
  //
  //if (arguments.docs) {
   // jsWatchArgs.tasks.push('run-docs');
  //}

  var jsWatcher = gulp.watch(jsWatchArgs.source, function() {
    return runSequence(jsWatchArgs.tasks);
  });

  var sassWatcher = gulp.watch(buildConfig.app_files.sass_all, function() {
    return runSequence('build-styles');
  });

  var htmlWatcher = gulp.watch(buildConfig.app_files.html, function() {
    return runSequence('copy-html');
  });

  jsWatcher.on('change', function(e) {
    console.log(chalk.yellow('[JS] ' + chalk.yellow(e.path)));
  });

  jsWatcher.on('add', function(e) {
    setTimeout(function() {
      return runSequence('html-injector');
    }, 1000);
    return console.log(chalk.yellow('[NEW JS FILE INJECTED] ' + chalk.yellow(e)));
  });

  sassWatcher.on('change', function(e) {
    console.log(chalk.yellow('[SASS] ' + chalk.yellow(e.path)));
  });

  htmlWatcher.on('change', function(e) {
    runSequence('copy-html');
    console.log(chalk.yellow('[HTML] ' + chalk.yellow(e.path)));
  });
});

