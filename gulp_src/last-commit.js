var buildConfig = require('../build.config.js');
var del         = require('del');
var fs          = require('fs');
var gulp        = require('gulp');
var plumber     = require('gulp-plumber');
var shell       = require('gulp-shell');

gulp.task('git-commit-create', shell.task('git log --pretty=format:"%H - %an, %ad : %s" -1 > .gitcommit'));

gulp.task('git-commit', ['git-commit-create'], function(done) {
    var file;
    file = fs.readFileSync('.gitcommit', {
        encoding: 'utf8'
    });
    file = JSON.stringify({
        message: 'Last commit: ' + file
    });
    file = "var lastCommitMessage = " + file;
    return fs.writeFile('src/assets/gitcommit.js', file, {}, done);
});

