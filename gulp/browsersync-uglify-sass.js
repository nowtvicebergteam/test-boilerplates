var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');

gulp.task('js', function() {
  return gulp.src('app/**/*.js')
    .pipe(uglify())
    .pipe(gulp.dest('dist/js'));
});

gulp.task('js-watch', ['js'], browserSync.reload);

gulp.task('sass', function() {
    return gulp.src("app/scss/*.scss")
        .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
        .pipe(concat('style.css'))
        .pipe(gulp.dest("dist/css"))
        .pipe(browserSync.stream());
});

gulp.task('serve', ['sass', 'compress'], function() {

    browserSync.init({
        server: "./dist/"
    });

    gulp.watch("app/*.html").on('change', browserSync.reload);
    gulp.watch("app/scss/*.scss", ['sass']);
    gulp.watch("app/**/*.js",  ['watch-js']);
});


gulp.task('default', ['serve']);