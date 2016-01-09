var gulp = require('gulp');

var express = require('express');
var app = express();
var concat = require('gulp-concat');
var jshint = require('gulp-jshint');
var livereload = require('gulp-livereload');
var minifyCSS = require('gulp-minify-css');
var sass = require('gulp-ruby-sass');
var uglify = require('gulp-uglify');

gulp.task('default', ['jshint', 'minify-js', 'sass', 'startServer'], function() {
  livereload.listen();
  gulp.watch('./src/layouts/**/*.html', ['dupe-layouts'],
    ['sass', livereload.changed]);
  gulp.watch('./src/assets/scripts/app/**/*.js', ['minify-js'],
    ['sass', livereload.changed]);
  gulp.watch(['./src/assets/stylesheets/*.scss','./src/assets/stylesheets/*/*.scss'],
    ['sass', livereload.changed]);
});

// JS
gulp.task('jshint', function(cb) {
  gulp.src('./src/assets/scripts/app/**/*.js')
  .pipe(jshint())
  .pipe(jshint.reporter('default'));
  cb();
});

gulp.task('minify-js', function(cb) {
  gulp.src('./src/assets/scripts/app/**/*.js')
    .pipe(concat('site.min.js'))
    // .pipe(uglify())
    .pipe(gulp.dest('./src/assets/scripts/'))
    .pipe(gulp.dest('./deploy/assets/scripts/'));
  cb();
});


gulp.task('sass', function () {
  return sass('./src/assets/stylesheets/site.scss',{
      "bundleExec": true,
      "sourcemap": true,
      "compass": false,
      "require": ["breakpoint", "susy"]
    })
    .on('error', function (err) {
        console.error('Error!', err.message);
    })
    .pipe(concat('site.css'))
    .pipe(minifyCSS())
    .pipe(gulp.dest('./src/assets/stylesheets/'))
    .pipe(gulp.dest('./deploy/assets/stylesheets/'));
});


gulp.task('startServer', function (cb) {
  app.use(express.static(__dirname + '/src'));

  cb();
  app.listen(8000);
});

gulp.task('dupe-layouts', function (cb) {
  gulp.src('./src/index.html')
  .pipe(gulp.dest('./deploy'));

  gulp.src('./src/layouts/**/*')
  .pipe(gulp.dest('./deploy/layouts'));

  cb();
});


gulp.task('build', ['minify-js', 'sass'], function (cb) {
  gulp.src('./src/assets/scripts/site.min.js')
  .pipe(gulp.dest('./deploy/assets/scripts/'));

  gulp.src('./src/assets/scripts/vendor/**/*')
  .pipe(gulp.dest('./deploy/assets/scripts/vendor/'));

  gulp.src('./src/assets/images/**/*')
  .pipe(gulp.dest('./deploy/assets/images/'));

  gulp.src('./src/assets/stylesheets/site.css')
  .pipe(gulp.dest('./deploy/assets/stylesheets/'));

  gulp.src('./src/assets/fonts/**/*')
  .pipe(gulp.dest('./deploy/assets/fonts/'));

  gulp.src('./src/index.html')
  .pipe(gulp.dest('./deploy'));

  gulp.src('./src/layouts/**/*')
  .pipe(gulp.dest('./deploy/layouts'));

});


gulp.task('buildServer', function() {
  app.use(express.static(__dirname + '/deploy'));

  gulp.watch('./src/assets/scripts/app/**/*.js', ['minify-js', 'build']);
  gulp.watch(['./src/assets/stylesheets/*.scss','./src/assets/stylesheets/*/*.scss'],
    ['sass', 'build', livereload.changed]);

  app.listen(8001);
});
