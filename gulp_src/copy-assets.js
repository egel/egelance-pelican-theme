var buildConfig   = require('../build.config.js');
var copy          = require('gulp-copy');
var gulp          = require('gulp');
var addSrc        = require('gulp-add-src');
var gulpif        = require('gulp-if');

gulp.task('copy-fonts', function() {
  return gulp.src(buildConfig.app_files.fonts)
    .pipe(addSrc(buildConfig.vendor_files.fonts))
    .pipe(gulp.dest(buildConfig.build_dir + '/static/fonts/'));
});

gulp.task('copy-html', function() {
  return gulp.src(buildConfig.app_files.html)
    .pipe(gulp.dest(buildConfig.build_dir + '/templates/'));
});

gulp.task('copy-plugins', function() {
  return gulp.src(buildConfig.app_files.plugins)
    .pipe(gulp.dest(buildConfig.build_dir + '/static/plugins/'));
});

