var buildConfig   = require('../build.config.js');
var gulp          = require('gulp');
var inject        = require('gulp-inject');
var series        = require('stream-series');
var htmlmin       = require('gulp-htmlmin');

gulp.task('inject-html', function() {

  var appSrc = gulp.src([
    buildConfig.compile_dir + '/app/**/*.js',
    buildConfig.compile_dir + '/common/**/*.js',
    buildConfig.compile_dir + '/' + buildConfig.tpl_name], {
    read: false
  });
  var vendorSrc = gulp.src(buildConfig.vendor_files.js, {
    read: false
  });

  var gitCommit = gulp.src(buildConfig.compile_dir + '/assets/gitcommit.js');

  var styles = gulp.src(buildConfig.compile_dir + '/**/*.css', {
    read: false
  });

  return gulp.src('src/index.html').pipe(inject(series(vendorSrc, gitCommit, appSrc, styles), {
    ignorePath: buildConfig.compile_dir
  })).pipe(gulp.dest(buildConfig.compile_dir));
});


gulp.task('build-html-prod', function() {
  var appSrc;
  appSrc = gulp.src([buildConfig.buildDir + '/*.js', buildConfig.buildDir + '/*.css'], {
    read: false
  });
  return gulp.src('src/index.html')
  .pipe(inject(appSrc, {ignorePath: buildConfig.buildDir}))
  .pipe(htmlmin({collapseWhitespace: true}))
  .pipe(gulp.dest(buildConfig.buildDir));
});

