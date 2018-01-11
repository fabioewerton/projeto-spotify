var gulp = require('gulp');
var html = require('gulp-htmlmin');
var sass = require('gulp-sass');
var browserSync = require('browser-sync');
var del = require('del');

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
      .pipe(browserSync.stream())
});

gulp.task('BS',['html', 'sass'], function() {
    browserSync.init({
    	server:{
    		baseDir: "dist/"
    	}
    })

    // Observa o html
    gulp.watch('src/*.html', ['html']);
    // Observa o scss
    gulp.watch('src/scss/*.scss', ['sass']);
});

gulp.task('default',['BS']);