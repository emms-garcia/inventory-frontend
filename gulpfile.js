'use strict';

var babelify = require('babelify'),
  browserify = require('browserify'),
  clean = require('gulp-clean'),
  gulp = require('gulp'),
  jade = require('gulp-jade'),
  runSequence = require('run-sequence'),
  sass = require('gulp-sass'),
  source = require('vinyl-source-stream'),
  webserver = require('gulp-webserver');

gulp.task('assets', function() {
  return gulp.src('./app/assets/**/*')
    .pipe(gulp.dest('./public/assets/'));
});

gulp.task('build', function(){
  runSequence('clean', 'assets', 'jade', 'js', 'sass');
});

gulp.task('clean', function() {
  return gulp.src('./public')
    .pipe(clean({
        force:true
    }));
});

gulp.task('dev', function () {
  runSequence('clean', 'assets', 'jade', 'js', 'sass', 'webserver', 'watch');
});

gulp.task('jade', function() {
  gulp.src('./app/jade/views/**/*.jade')
    .pipe(jade())
    .pipe(gulp.dest('./public/assets/views'));
  gulp.src('./app/jade/index.jade')
    .pipe(jade())
    .pipe(gulp.dest('./public'))
});

gulp.task('js', function() {
  return browserify({
      debug : true,
      entries : ['./app/scripts/app.js'],
      extensions : ['.js'],
      transform : [babelify]
    })
    .bundle()
    .pipe(source('app.js'))
    .pipe(gulp.dest('./public/assets/js'));
});

gulp.task('sass', function() {
  return gulp.src('./app/styles/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./public/assets/css/'));
});

gulp.task('watch', function() {
  gulp.watch('app/assets/**/*', ['assets']);
  gulp.watch('app/scripts/**/*.js', ['js']);
  gulp.watch('app/jade/**/*.jade', ['jade']);
  gulp.watch('app/styles/**/*.scss', ['sass']);
});

gulp.task('webserver', function () {
  gulp.src('./public')
    .pipe(webserver({
      directoryListing: false,
      livereload: true,
      open: true,
      port: 4000,
      proxies: [{source: '/v1', target: 'http://localhost:8000/v1'}]
    }));
});
