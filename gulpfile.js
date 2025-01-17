var gulp = require('gulp');

gulp.task('bundle', function() {
    var SystemBuilder = require('systemjs-builder');
    var argv = require('yargs').argv;
    var builder = new SystemBuilder();

    builder.loadConfig('./system.config.js')
        .then(function(){
            var outputFile = argv.prod ? 'dist/bundle.min.js' : 'dist/bundle.js';
            return builder.buildStatic('app', outputFile, {
                minify: argv.prod,
                mangle: argv.prod,
                rollup: argv.prod
            });
        })
        .then(function(){
            console.log('bundle built successfully!');
        });
});

var minify = require('gulp-minify');

gulp.task('compress', function() {
    gulp.src('dist/*.js')
        .pipe(minify({
            ext:{
                src:'-debug.js',
                min:'.js'
            },
            exclude: ['tasks'],
            ignoreFiles: ['.combo.js', '-min.js']
        }))
        .pipe(gulp.dest('dist'))
});