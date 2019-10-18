'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var watch = require('gulp-watch');
var browserSync  = require('browser-sync').create();
var clean = require('gulp-clean');
var rimraf = require('rimraf'); // Очистка
var autoprefixer = require('gulp-autoprefixer');
var reload = browserSync.reload;
var cleanCSS = require('gulp-clean-css');
var htmlmin = require('gulp-htmlmin');
var sourcemaps = require('gulp-sourcemaps');
var concat = require('gulp-concat');
var minifyJS 	= require("gulp-uglify"); // замінив на uglify-es
var uglify = require('gulp-uglify-es').default; // використовую це
var plumber = require('gulp-plumber');

// Watch clean build
gulp.task('clean', function (cb) {
    rimraf('build', cb);
});

// html Task
gulp.task('html', function() {
    //return gulp.src('src/*.html')
    return gulp.src('src/*.*')
        /* Стискання
        .pipe(htmlmin({
            collapseWhitespace: true,
            removeComments: true
        }))
        */
        .pipe(gulp.dest('build'))
        .pipe(reload({ stream:true }));
});

// Styles Task

gulp.task('sass', function() {
    return gulp.src('src/sass/*.scss')
        .pipe(plumber()) // моніторингу помилок
        .pipe(sourcemaps.init())  //вкінці розкоментувати
        .pipe(autoprefixer(['ie >= 10', 'ie_mob >= 10', 'ff >= 30', 'chrome >= 34', 'safari >= 7', 'opera >= 23', 'ios >= 7', 'android >= 4.4', 'bb >= 10' ], { cascade: true })) // дізнатися які ще потрібні
         .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError)) //вкінці розкоментувати
        .pipe(cleanCSS())         //вкінці розкоментувати
        .pipe(sourcemaps.write('.')) //вкінці розкоментувати
        .pipe(gulp.dest('build/css'))
      //  .pipe(concat('style.css'))
        .pipe(reload({ stream:true }));
});

// Images Task 2
gulp.task('css', function() {
    return gulp.src('src/css/*')
        .pipe(gulp.dest('build/css'))
        .pipe(reload({ stream:true }));
});

var options = {};
// Scripts Task
gulp.task('scripts', function () {
    return gulp.src('src/js/**/*.*') 
        //.pipe(plumber()) // моніторингу помилок
        //.pipe(sourcemaps.init()) 
        //.pipe(minifyJS()) // замінив на uglify-es
        //.pipe(uglify(options)) // використовую це
        //.pipe(sourcemaps.write('.'))
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

// Images Task
gulp.task('favicon', function() {
    return gulp.src('src/favicon/*')
        .pipe(gulp.dest('build/favicon'))
        .pipe(reload({ stream:true }));
});

gulp.task('serve', gulp.series('clean', 'html', 'sass', 'css', 'scripts', 'images', 'fonts', 'favicon', function() {
    browserSync.init({
      server: {
        baseDir: 'build'
      }
    });

    gulp.watch("src/*.html", gulp.series('html'));
    gulp.watch("src/sass/*.scss", gulp.series('sass'));
    gulp.watch("src/css/*.css", gulp.series('css'));
    gulp.watch('src/js/*.js', gulp.series('scripts'));
    gulp.watch('src/images/*', gulp.series('images'));
    gulp.watch('src/fonts/*', gulp.series('fonts'));        
}));

gulp.task("default", gulp.series('clean', 'html', 'sass', 'css', 'scripts', 'images', 'fonts', 'serve'));
//щоб запустити все прописати в консосі gulp
