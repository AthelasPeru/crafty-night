var config         = require('../config.js').javascript,
    errorHandler   = require('../helpers/errorHandler.js'),
    isProduction   = require('../helpers/isProduction.js'),
    reload         = require('../helpers/reload.js'),
    gulp           = require('gulp'),
    uglify         = require('gulp-uglify'),
    rename         = require('gulp-rename'),
    browserify     = require('browserify'),
    source         = require('vinyl-source-stream'),
    buffer         = require('vinyl-buffer'),
    sourcemaps     = require('gulp-sourcemaps'),
    gutil          = require('gulp-util'),
    watchify       = require('watchify'),
    plumber        = require('gulp-plumber'),
    changed        = require('gulp-changed'),
    assign 		   = require('lodash.assign');

// add custom browserify options here
var customOpts = {
  entries: [config.source + '/app.js'],
  debug: true
};

var opts = assign({}, watchify.args, customOpts);

var b = watchify(browserify(opts));

function bundle() {
  return b.bundle()
    .on('error', errorHandler)
    .pipe(source('app.js'))
    // optional, remove if you don't need to buffer file contents
    .pipe(buffer())
    .pipe( isProduction === true ? uglify() : gutil.noop() )
    .pipe(sourcemaps.init({loadMaps:true}))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest(config.dist))
}

gulp.task('javascriptOnHead', function () {
  return gulp.src(config.headscripts + '/**/*.js')
    .pipe(plumber({
        errorHandler: errorHandler
    }))
    .pipe(changed(config.dist))
    .pipe(isProduction === true ? uglify() : gutil.noop() )
    .pipe(rename({
        basename: 'head'
    }))
    .pipe(plumber.stop())
    .pipe(gulp.dest(config.dist))
    .pipe( reload() )
})

gulp.task('javascript', ['javascriptOnHead'], bundle);

b.on('update', bundle);
b.on('log', gutil.log);
