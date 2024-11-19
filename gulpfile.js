const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const sourcemaps = require('gulp-sourcemaps');
const uglify = require('gulp-uglify');
const obfuscate = require('gulp-obfuscate');
const imagemin = require('gulp-imagemin');


function compilaSass() {
    console.log('Compilando SASS...');
    return gulp.src('./source/styles/main.scss')
        .pipe(sourcemaps.init())
        .pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError))
        .pipe(sourcemaps.write('./maps'))
        .pipe(gulp.dest('./build/styles'));
}



function comprimeImagens() {
    return gulp.src('./source/images/*')
        .pipe(imagemin())
        .pipe(gulp.dest('./build/images'));
}

function comprimeJavaScript() {
    return gulp.src('./source/scripts/*.js')
        .pipe(uglify())
        .pipe(obfuscate())
        .pipe(gulp.dest('./build/scripts'));
}



exports.default = function() {
    gulp.watch('./source/styles/*scss',{ ignoreInitial: false }, gulp.parallel(compilaSass));
    gulp.watch('./source/scripts/*.js',{ ignoreInitial: false }, gulp.parallel(comprimeJavaScript));
    gulp.watch('./source/images/*',{ ignoreInitial: false }, gulp.parallel(comprimeImagens));
}