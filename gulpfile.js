var gulp = require('gulp'),
    concat = require('gulp-concat'),
    ngannotate = require('gulp-ng-annotate'),
    uglify = require('gulp-uglify'),
    cssmin = require('gulp-cssmin'),
    rename = require('gulp-rename'),
    processhtml = require('gulp-processhtml'),
    del = require('del'),
    livereload = require('gulp-livereload'),
    sass = require('gulp-sass'),
    pkg = require('./package.json');
var appPath = 'src/app/',
    resourcesPath = appPath + 'resources/',
    distPath = 'dist/';

gulp.task('clean-src', function(callback) {
    del([appPath + pkg.name + '.js', appPath + pkg.name + '.min.js'], callback);
});

gulp.task('clean-dist', function(callback) {
    del([distPath + '**/*'], callback);
});

gulp.task('concat', function() {
    return gulp.src([appPath + 'modules/**/*-module.js', appPath + 'modules/**/*.js', appPath + 'app.js'])
        .pipe(concat(pkg.name + '.js'))
        .pipe(gulp.dest(appPath));
});

gulp.task('js-minify-obfuscate', ['concat'], function() {
    return gulp.src([appPath + pkg.name + '.js'])
        .pipe(rename({suffix: '.min'}))
        .pipe(ngannotate())
        .pipe(uglify())
        .pipe(gulp.dest(distPath + appPath));
});

gulp.task('css-minify', function() {
    return gulp.src([resourcesPath + 'css/app.css'])
        .pipe(cssmin())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest(distPath + resourcesPath + 'css/'));
});

gulp.task('sass', function() {
  return gulp.src(resourcesPath + 'scss/**.scss')
      .pipe(sass().on('error', sass.logError))
      .pipe(gulp.dest(resourcesPath + 'css/'));
});

gulp.task('process-index', function() {
    return gulp.src([appPath + 'index.html'])
        .pipe(processhtml())
        .pipe(gulp.dest(distPath + appPath));
});

gulp.task('copy-to-dist', ['process-index'], function() {
    gulp.src([appPath + 'modules/**/*.html'])
        .pipe(gulp.dest(distPath + appPath + 'modules/'));
    gulp.src([resourcesPath + 'css/*.min.css'])
        .pipe(gulp.dest(distPath + resourcesPath + 'css/'));
    gulp.src(['bower_components/**/*.min.js'])
        .pipe(gulp.dest(distPath + resourcesPath + 'js/'));
    gulp.src([resourcesPath + 'documents/**/*'])
        .pipe(gulp.dest(distPath + resourcesPath + 'documents/'));
    gulp.src([resourcesPath + 'fonts/**/*'])
        .pipe(gulp.dest(distPath + resourcesPath + 'fonts/'));
    gulp.src([resourcesPath + 'images/**/*'])
        .pipe(gulp.dest(distPath + resourcesPath + 'images/'));
});

gulp.task('watch', function() {
    gulp.watch([appPath + 'modules/**', resourcesPath, appPath + pkg.main, appPath + 'index.html'], ['dev']);
    gulp.watch([resourcesPath + 'scss/**'], ['sass']);
    gulp.watch([appPath + pkg.main]).on('change', livereload.changed);
});



// gulp.task('dev', ['clean-src'], function() {
//     gulp.start('concat');
// });
gulp.task('dev', function() {
  gulp.start('concat', 'sass');
});


// gulp.task('prod', ['clean-src', 'clean-dist'], function() {
//     gulp.start('js-minify-obfuscate', 'css-minify', 'copy-to-dist');
// });
