var gulp = require('gulp');
var html = require('gulp-htmlmin');
var sass = require('gulp-sass');
var browserSync = require('browser-sync');
var del = require('del');
var notify = require('gulp-notify');

// html
gulp.task('html', function() {
    return gulp.src('src/*.html')
      .pipe(html({collapseWhitespace: true}))
      .pipe(gulp.dest('dist/'))
      .pipe(browserSync.stream())
});

// sass
gulp.task('sass', function() {
    return gulp.src('src/scss/style.scss')
      .pipe(sass({outputStyle:"compressed"}))
      .pipe(gulp.dest('dist/css/'))
      .on("error", notify.onError("Error: <%= error.message %>"))
      .pipe(browserSync.stream())

});

gulp.task('BS',['html', 'sass'], function() {
    browserSync.init({
    	server:{
    		baseDir: "dist/"
    	}
    })

    gulp.watch('src/*.html', ['html']);
    gulp.watch('src/scss/*.scss', ['sass']);
});

gulp.task('default',['BS']);