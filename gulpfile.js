var gulp = require('gulp'),
  connect = require('gulp-connect');

gulp.task('connect', function() {
  connect.server({
    root: './',
    livereload: true
  });
});

gulp.task('resources', function() {
  gulp.src('./src/**/*.**')
    .pipe(connect.reload());
});

gulp.task('watch', function() {
  gulp.watch(['**/*.**'], ['resources']);
});


gulp.task('default', ['connect', 'watch']);
