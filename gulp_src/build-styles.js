var pkg           = require('../package.json');
var buildConfig   = require('../build.config.js');
var gulp          = require('gulp');
var addSrc        = require('gulp-add-src');
var concat        = require('gulp-concat');
var connect       = require('gulp-connect');
var gulpif        = require('gulp-if');
var plumber       = require('gulp-plumber');
var rename        = require('gulp-rename');
var sass          = require('gulp-sass');
var sourcemaps    = require('gulp-sourcemaps');
var autoprefixer  = require('gulp-autoprefixer');

gulp.task('build-styles', function() {
  filename = 'styles'
  return gulp.src('src/themes/' + buildConfig.project_theme_name + "/main.sass")
    .pipe(plumber())
    .pipe(sourcemaps.init())
    .pipe(autoprefixer())
    .pipe(sass({ indentedSyntax: true }).on('error', sass.logError))
    .pipe(addSrc(buildConfig.vendor_files.css))
    .pipe(concat(filename + '.css'))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(buildConfig.build_dir + '/static/css/'))
    .pipe(connect.reload());
});

