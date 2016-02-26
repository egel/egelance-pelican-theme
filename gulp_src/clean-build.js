var buildConfig = require('../build.config.js');
var fs          = require('fs');
var plumber     = require('gulp-plumber');
var gulp        = require('gulp');
var del         = require('del');
var shell       = require('gulp-shell');

gulp.task('clean-all', function() {
    return del.sync([
        buildConfig.build_dir,
        buildConfig.tmp_dir
    ], {
        force: true
    })
});

