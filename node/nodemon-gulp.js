var gulp = require('gulp');
var nodemon = require('gulp-nodemon');

gulp.task('nodemon', function () {
    process.env.NODE_ENV = 'development';
    nodemon({
        script: "./server/index.js",
        ignore: ['./server/**/*.spec.js', './app/**/*'] //ignore any spec files, ignore public files that dont need a backend restart
    })
        .on('restart', function () {
            console.log('restarted!');
        });
});