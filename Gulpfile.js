var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync').create();
var argv = require('yargs').argv;
var src = argv.s + '/' || '';

gulp.task('styles', function() {
  gulp.src( src + 'sass/**/*.scss')
  .pipe(sass().on('error', sass.logError))
  .pipe(gulp.dest( src + './css/'));
});

gulp.task('browser-sync', function() {
  browserSync({
    proxy: 'localhost:3000',
    open: true
  });
  gulp.watch(['*.php']).on('change', browserSync.reload);
});

//Watch task
gulp.task('default',function() {
  console.log(src);
  gulp.watch([ src + 'sass/**/*.scss'],['styles']);
});