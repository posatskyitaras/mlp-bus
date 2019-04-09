'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var watch = require('gulp-watch');
var browserSync  = require('browser-sync').create();
var clean = require('gulp-clean');
var rimraf = require('rimraf'); // Очистка
var reload = browserSync.reload;

// Watch clean build
gulp.task('clean', function (cb) {
    rimraf('build', cb);
});

// html Task
gulp.task('html', function() {
    return gulp.src('src/*.html')
        .pipe(gulp.dest('build'))
        .pipe(reload({ stream:true }));
});

// Styles Task
gulp.task('sass', function() {
    return gulp.src('src/sass/*.scss')
        .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
        .pipe(sass())
        .pipe(gulp.dest('build/css'))
        .pipe(reload({ stream:true }));
});

// Scripts Task
gulp.task('scripts', function () {
    return gulp.src('src/js/*.js') //Найдем наш main файл
        .pipe(gulp.dest('build/js'))
        .pipe(reload({ stream:true }));
});


// Images Task
gulp.task('images', function() {
    return gulp.src('src/images/*')
        .pipe(gulp.dest('build/images'))
        .pipe(reload({ stream:true }));
});
 
//fonts Task
gulp.task('fonts', function() {
    return gulp.src('src/fonts/*')
        .pipe(gulp.dest('build/fonts'))
        .pipe(reload({ stream:true }));
});

gulp.task('serve', gulp.series('clean', 'html', 'sass', 'scripts', 'images', 'fonts', function() {
    browserSync.init({
      server: {
        baseDir: 'build'
      }
    });

    gulp.watch("src/*.html", gulp.series('html'));
    gulp.watch("src/sass/*.scss", gulp.series('sass'));
    gulp.watch('src/js/*.js', gulp.series('scripts'));
    gulp.watch('src/images/*', gulp.series('images'));
    gulp.watch('src/fonts/*', gulp.series('fonts'));        
}));

gulp.task("default", gulp.series('clean', 'html', 'sass', 'scripts', 'images', 'fonts', 'serve'));
//щоб запустити все прописати в консосі gulp
