var pkg           = require('../package.json');
var buildConfig   = require('../build.config.js');
var gulp           = require('gulp');
var addSrc         = require('gulp-add-src');
var concat         = require('gulp-concat');
var connect        = require('gulp-connect');
var gulpif         = require('gulp-if');
var plumber        = require('gulp-plumber');
var rename         = require('gulp-rename');
var sass           = require('gulp-sass');
var sourcemaps     = require('gulp-sourcemaps');

gulp.task('build-styles', function() {
  return gulp.src('src/templates/' + buildConfig.project_theme_name + "/main.sass")
    .pipe(plumber())
    .pipe(sass({ indentedSyntax: true }).on('error', sass.logError))
    .pipe(addSrc(buildConfig.vendor_files.css))
    //.pipe(sourcemaps.write(buildConfig.build_dir + './maps'))
    .pipe(concat(pkg.name + '-' + pkg.version + '.css'))
    .pipe(gulp.dest(buildConfig.build_dir))
    .pipe(connect.reload());
});

