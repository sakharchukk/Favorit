const gulp = require('gulp');
const rename = require('gulp-rename');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const sourcemaps = require('gulp-sourcemaps');
const browserSync = require('browser-sync').create();

function css_style(done) {

    gulp.src('./scss/**/*.scss')
        .pipe(sourcemaps.init())
        .pipe(sass({
            errorLogToConsole: true,
            outputStyle: 'compressed'
        }))
        .on('error', console.error.bind(console))
        .pipe(autoprefixer({
            overrideBrowserslist: ['last 2 versions'],
            cascade: false
        }))
        .pipe(rename({suffix: '.min'}))
        .pipe(sourcemaps.write('./'))
        .pipe( gulp.dest('./css/') )
        .pipe(browserSync.stream());

    done();
}

function sync(done) {
    browserSync.init({
       server: {
           baseDir: "./"
       },
        port: 3000
    });
    done();
}

function browserReload(done) {
    browserSync.reload();
    done();
}

function watchSass(){
    gulp.watch("./scss/**/*", css_style);
}

function watchFiles(){
    gulp.watch("./scss/**/*", css_style);
    gulp.watch("./**/*.html", browserReload);
    gulp.watch("./**/*.js", browserReload);
    gulp.watch("./**/*.php", browserReload);
}

gulp.task('default', gulp.parallel(sync, watchFiles));
gulp.task(sync);