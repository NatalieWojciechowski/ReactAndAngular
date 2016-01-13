var gulp = require('gulp');

var express = require('express');
var app = express();
var concat = require('gulp-concat');
var child_process = require('child_process');
var exec = require('child_process').exec;
var jshint = require('gulp-jshint');
var livereload = require('gulp-livereload');
var minifyCSS = require('gulp-minify-css');
var sass = require('gulp-ruby-sass');
var uglify = require('gulp-uglify');

gulp.task('default', ['jshint', 'minify-js', 'sass', 'startServer'], function() {
  livereload.listen();
  gulp.watch('./src/layouts/**/*.html', ['sass', livereload.changed]);
  gulp.watch('./src/assets/scripts/app/**/*.js', ['minify-js'],
    ['sass', livereload.changed]);
  gulp.watch('./src/assets/scripts/react/compiled_react_app.js', livereload.changed);
  gulp.watch(['./src/assets/stylesheets/*.scss','./src/assets/stylesheets/*/*.scss'],
    ['sass', livereload.changed]);
});

gulp.task('webpack', function(cb) {
  child = child_process.exec('./node_modules/webpack/bin/webpack.js -w -d',
    function (error, stdout, stderr) {
      console.log('stdout: ' + stdout);
      console.log('stderr: ' + stderr);
      if (error !== null) {
        console.log('exec error: ' + error);
      }
  });
  console.log('starting webpack build');
});

gulp.task('webpack-dev', function(cb) {
  child = child_process.exec('./node_modules/webpack-dev-server/bin/webpack-dev-server.js --content-base ./app/',
    function (error, stdout, stderr) {
      console.log('stdout: ' + stdout);
      console.log('stderr: ' + stderr);
      if (error !== null) {
        console.log('exec error: ' + error);
      }
  });
  console.log('starting webpack build');
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
    .pipe(gulp.dest('./src/assets/scripts/'));
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
    .pipe(gulp.dest('./src/assets/stylesheets/'));
});


gulp.task('startServer', function (cb) {
  app.use(express.static(__dirname + '/src'));

  cb();
  app.listen(8000);
});
