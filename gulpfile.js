var gulp = require('gulp');
var html = require('gulp-htmlmin');
var sass = require('gulp-sass');
var browserSync = require('browser-sync');
var del = require('del');

// Move bootstrap
gulp.task('bootstrap-move', function() {
    gulp.src('./bower_components/bootstrap/*')
    .pipe(gulp.dest('./_src/bootstrap/'));
});

// html
gulp.task('html', function() {
    return gulp.src('./_src/*.html')
      .pipe(html({collapseWhitespace: true}))
      .pipe(gulp.dest('./_dist/'))
      .pipe(browserSync.stream())
});

// sass
gulp.task('sass', function() {
    return gulp.src('./_src/scss/style.scss')
      .pipe(sass({outputStyle:"compressed"}))
      .pipe(gulp.dest('./_dist/css/'))
      .pipe(browserSync.stream())
});

gulp.task('BS',['html', 'sass'], function() {
    browserSync.init({
    	server:{
    		baseDir: "_dist/"
    	}
    })

    // Observa o html
    gulp.watch('./_src/*.html', ['html']);
    // Observa o scss
    gulp.watch('./_src/scss/*.scss', ['sass']);
});

gulp.task('default',['BS']);