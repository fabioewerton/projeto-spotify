var del = require('del');
var gulp = require('gulp');
var html = require('gulp-htmlmin');
var sass = require('gulp-sass');
var notify = require('gulp-notify');
var browserSync = require('browser-sync');

// fonts/
gulp.task('fonts', function() {
    gulp.src('./bower_components/font-awesome/fonts/*.*')
      .pipe(gulp.dest('./dist/fonts/'))
});

// img/
gulp.task('img', function() {
    gulp.src('./src/img/**/*.*')
      .pipe(gulp.dest('./dist/img/'));
});

// Sass
gulp.task('sass', function() {
    return gulp.src('src/scss/style.scss')
      .pipe(sass({outputStyle:"compressed"}))
      .on("error", notify.onError("Error: <%= error.message %>"))
      .pipe(gulp.dest('dist/css/'))
      .pipe(browserSync.stream())
});

// html
gulp.task('html', function() {
    return gulp.src('src/*.html')
      .pipe(html({collapseWhitespace: true}))
      .on("error", notify.onError("Error: <%= error.message %>"))
      .pipe(gulp.dest('dist/'))
      .pipe(browserSync.stream())
});

gulp.task('BS',['html','sass','img', 'fonts'], function() {
    browserSync.init({
    	server:{
    		baseDir: "dist/"
    	}
    })

    gulp.watch('src/**/*.html', ['html']);
    gulp.watch('src/scss/**/*.scss', ['sass']);
    gulp.watch('src/img/**/*.*', ['img']);
});

gulp.task('default',['BS']);