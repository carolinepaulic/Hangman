var gulp = require('gulp'),
  concat = require('gulp-concat'),
  cssmin = require('gulp-cssmin'),
  livereload = require('gulp-livereload'),
  ngannotate = require('gulp-ng-annotate'),
  processhtml = require('gulp-processhtml'),
  rename = require('gulp-rename'),
  uglify = require('gulp-uglify'),
  del = require('del'),
  sass = require('gulp-sass'),
  pkg = require('./package.json');
var appPath = 'src/app/',
  resourcesPath = 'resources/',
  distPath = 'dist/';

gulp.task('clean:src', function(done) {
  del([appPath + pkg.name + '.js', appPath + resourcesPath + 'css/app.css']);
  done();
});

gulp.task('clean:dist', function(done) {
  del([distPath]);
  done();
});

gulp.task('js-concat', function(done) {
  gulp.src([appPath + 'modules/**/*-module.js', appPath + 'modules/**/*.js', appPath + 'app.js'])
    .pipe(concat(pkg.name + '.js'))
    .pipe(gulp.dest(appPath));
  done();
});

gulp.task('js-minify-obfuscate', gulp.series(function(done) {
  gulp.src([appPath + pkg.name + '.js'])
    .pipe(rename({suffix: '.min'}))
    .pipe(ngannotate())
    .pipe(uglify())
    .pipe(gulp.dest(distPath));
  done();
}));

gulp.task('css-minify', function(done) {
  gulp.src([appPath + resourcesPath + 'css/app.css'])
    .pipe(cssmin())
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest(distPath + resourcesPath + 'css/'));
  done();
});

gulp.task('sass-compile', function(done) {
  gulp.src(appPath + resourcesPath + 'scss/**.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest(appPath + resourcesPath + 'css/'));
  done();
});

gulp.task('process-index', function(done) {
  gulp.src([appPath + 'index.html'])
    .pipe(processhtml())
    .pipe(gulp.dest(distPath));
  done();
});

gulp.task('copy-to-dist', function(done) {
  gulp.src([appPath + 'modules/**/*.html'])
    .pipe(gulp.dest(distPath + 'modules/'));
  gulp.src([appPath + resourcesPath + 'css/*.min.css', 'node_modules/bootstrap/dist/css/bootstrap.min.css'])
    .pipe(gulp.dest(distPath + resourcesPath + 'css/'));
  gulp.src(['node_modules/**/*.min.js'])
    .pipe(gulp.dest(distPath + resourcesPath + 'js/'));
  gulp.src([appPath + resourcesPath + 'documents/**/*'])
    .pipe(gulp.dest(distPath + resourcesPath + 'documents/'));
  gulp.src([appPath + resourcesPath + 'fonts/**/*'])
    .pipe(gulp.dest(distPath + resourcesPath + 'fonts/'));
  gulp.src([appPath + resourcesPath + 'images/**/*'])
    .pipe(gulp.dest(distPath + resourcesPath + 'images/'));
    done();
});

gulp.task('dev',
  gulp.series(
    'clean:src',
    'js-concat',
    'sass-compile'
  )
);

gulp.task('prod',
  gulp.series(
    'dev',
    'clean:dist',
    'js-minify-obfuscate',
    'css-minify',
    'process-index',
    'copy-to-dist'
  )
);

gulp.task('watch', function() {
  livereload.listen(35729);
  gulp.watch([appPath + 'modules/**/*.js', appPath + resourcesPath + 'scss/**'], gulp.series('dev'));
  gulp.watch([appPath + 'index.html', appPath + 'modules/**/*.html', appPath + pkg.name + '.js'], function(done) {
    livereload.reload();
    done();
  });
});