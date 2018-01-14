var del = require('del');
var gulp = require('gulp');
var html = require('gulp-htmlmin');
var sass = require('gulp-sass');
var notify = require('gulp-notify');
var browserSync = require('browser-sync');

//Bootstrap
gulp.task('mbts', function() {
    return gulp.src('./bower_components/bootstrap/dist/**/*.*')
      .pipe(gulp.dest('./src/bootstrap/'))

});

gulp.task('mbtd',['mbfs'], function() {
      gulp.src('./src/bootstrap/**/*.*')
      .pipe(gulp.dest('./dist/bootstrap/'));
});

// move img para ./dist/
gulp.task('img', function() {
    gulp.src('./src/img/**/*.*')
      .pipe(gulp.dest('./dist/img/'));
});
// move index para a pasta ./dist/
gulp.task('html', function() {
    return gulp.src('src/*.html')
      .pipe(html({collapseWhitespace: true}))
      .pipe(gulp.dest('dist/'))
      .pipe(browserSync.stream())
});

// move os estilos para a pasta ./dist/css/
gulp.task('sass', function() {
    return gulp.src('src/scss/style.scss')
      .pipe(sass({outputStyle:"compressed"}))
      .pipe(gulp.dest('dist/css/'))
      .on("error", notify.onError("Error: <%= error.message %>"))
      .pipe(browserSync.stream())

});

gulp.task('BS',['html', 'sass', 'img'], function() {
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