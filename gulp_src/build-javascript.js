var pkg           = require('../package.json');
var buildConfig   = require('../build.config.js');
var gulp          = require('gulp');
var addSrc        = require('gulp-add-src');
var concat        = require('gulp-concat');
var connect       = require('gulp-connect');
var gulpif        = require('gulp-if');
var plumber       = require('gulp-plumber');
var rename        = require('gulp-rename');
var sourcemaps    = require('gulp-sourcemaps');
var uglify        = require('gulp-uglify');


gulp.task('build-javascript', function() {
  var filename = 'scripts'
  return gulp.src(buildConfig.vendor_files.js)
    .pipe(addSrc.append(buildConfig.app_files.js))
    .pipe(plumber())
    .pipe(sourcemaps.init())
    .pipe(concat(filename + '.js'))
    .pipe(uglify())
    .pipe(rename({ extname: '.min.js' }))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(buildConfig.build_dir + '/static/js/'));
});

