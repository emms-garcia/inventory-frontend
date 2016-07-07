'use strict';

var babelify = require('babelify'),
  browserify = require('browserify'),
  clean = require('gulp-clean'),
  concat = require('gulp-concat'),
  concatCss = require('gulp-concat-css'),
  gulp = require('gulp'),
  jade = require('gulp-jade'),
  runSequence = require('run-sequence'),
  sass = require('gulp-sass'),
  source = require('vinyl-source-stream'),
  webserver = require('gulp-webserver');

var vendorDependencies = [
  './app/assets/js/jquery.min.js',
  './app/assets/js/bootstrap.min.js',
  './app/assets/js/plugins/metismenu/jquery.metisMenu.js',
  './app/assets/js/functions.js',
];

gulp.task('assets', function() {
  runSequence('css', 'vendor');

  gulp.src(['./app/assets/**/*',
            '!./app/assets/css/', '!./app/assets/css/**',
            '!./app/assets/js/', '!./app/assets/js/**'])
    .pipe(gulp.dest('./public/assets/'));
});

gulp.task('build', function(){
  runSequence('clean', 'assets', 'jade', 'js');
});

gulp.task('clean', function() {
  return gulp.src('./public')
    .pipe(clean({
        force:true
    }));
});

gulp.task('dev', function () {
  runSequence('clean', 'assets', 'jade', 'js', 'webserver', 'watch');
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

gulp.task('css', function () {
  gulp.src('./app/assets/css/*.css')
    .pipe(concatCss("app.css"))
    .pipe(gulp.dest('./public/assets/css'));
});


gulp.task('sass', function() {
  return gulp.src('./app/styles/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./public/assets/css/'));
});

gulp.task('vendor', function() {
  gulp.src(vendorDependencies)
    .pipe(concat('vendor.js'))
    .pipe(gulp.dest('./public/assets/js/'));
});

gulp.task('watch', function() {
  gulp.watch('app/assets/**/*', ['assets']);
  gulp.watch('app/scripts/**/*.js', ['js']);
  gulp.watch('app/jade/**/*.jade', ['jade']);
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
