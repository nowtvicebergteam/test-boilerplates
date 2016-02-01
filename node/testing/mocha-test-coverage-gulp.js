var gulp = require('gulp');
var mocha = require('gulp-mocha');
var istanbul = require('gulp-istanbul');


gulp.task('mocha', function () {
    gulp.src(['./server/**/*.js', '!./server/**/*.spec.js', '!./server/index.js', '!./server/lib/*.js'])
        .pipe(istanbul()) // Covering files
        .pipe(istanbul.hookRequire()) // Force `require` to return covered files
        .on('finish', function () {
            gulp.src('./server/**/*.spec.js')
                .pipe(mocha({
                    ui: 'bdd',
                    reporter: 'spec'
                }))
                .pipe(istanbul.writeReports({
                    reporters: ['html', 'text', 'text-summary', 'lcov']
                }))
                .pipe(istanbul.enforceThresholds({
                    thresholds: {
                        global: 80 //Force at least 80% coverage
                    }
                }))
                .once('end', function () {
                    process.exit();
                });
        });
});