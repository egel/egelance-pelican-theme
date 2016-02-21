var buildConfig  = require('../build.config');
var copy         = require('gulp-copy');
var gulp         = require('gulp');
var gulpif       = require('gulp-if');

gulp.task('copy-fonts', function() {
  return gulp.src(buildConfig.app_files.fonts)
    .pipe(gulp.dest(buildConfig.build_dir + '/static/fonts'));
});

gulp.task('copy-plugins', function() {
  return gulp.src(buildConfig.app_files.fonts).pipe(gulp.dest(buildConfig.build_dir + '/assets'));
});

//gulp.task('copy-images', function() {
  //return gulp.src(buildConfig.app_files.images)
    //.pipe(gulp.dest(buildConfig.build_dir + '/static/images'));
//});

//gulp.task('vendor-js', function() {
  //return gulp.src(config.vendor_files.js).pipe(gulpif(!config.variables.production, copy(config.compile_dir)));
//});

gulp.task('copy-assets', [
  'copy-fonts',
  'copy-plugins'
]);


