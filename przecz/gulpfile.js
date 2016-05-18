var gulp = require('gulp');
var args = require('yargs').argv;
var browserSync = require('browser-sync');
var config = require('./gulp.config')();
var del = require('del');
var $ = require('gulp-load-plugins')({lazy: true});
var port = process.env.PORT || config.defaultPort;

gulp.task('help', $.taskListing);
gulp.task('default', ['help']);

gulp.task('vet', function() {
    log('Analyzing source with jshint and jscs');
    return gulp
    .src(config.alljs)
    .pipe($.if(args.verbose, $.print()))
    .pipe($.jscs())
    .pipe($.jshint())
    .pipe($.jshint.reporter('jshint-stylish', {verbose: true}))
    .pipe($.jshint.reporter('fail'));
});

gulp.task('styles', ['clean-styles'], function() {
    log('Compiling SASS--> CSS');

    return gulp.src(config.sass)
    .pipe($.plumber())
    .pipe($.plumber())
    .pipe($.sass())
    .pipe($.autoprefixer({browsers: ['last 2 version', '> 5%']}))
    .pipe(gulp.dest(config.temp));
});

gulp.task('clean', function(done) {
    var delconfig = [].concat(config.build, config.temp);
    log('Cleaning: ' + $.util.colors.blue(delconfig));
    return del(delconfig, done);
});

gulp.task('clean-styles', function(done) {
    var files = config.temp + '**/*.css';
    return clean(files, done);
});

gulp.task('clean-files', function(done) {
    var files = [].concat(
        config.temp + '**/*.js',
        config.build + '**/*.html',
        config.build + 'js/**/*.js'
    );
    
    return clean(files, done);
});

gulp.task('sass-watcher', function() {
    gulp.watch([config.sass], ['styles']);
});

gulp.task('wiredep', function() {
    log('Wire up bower css, js, and app js');
    var options = config.getWiredepDefaultOptions();
    var wiredep = require('wiredep').stream;

    return gulp
        .src(config.index)
        .pipe(wiredep(options))
        .pipe($.inject(gulp.src(config.js)))
        .pipe(gulp.dest(config.client));
});

gulp.task('inject', ['wiredep', 'styles'], function() {
    log('Wire up app css');
    return gulp
        .src(config.index)
        .pipe($.inject(gulp.src(config.css)))
        .pipe(gulp.dest(config.client));
});

gulp.task('optimize', ['inject'], function() {
    log('Optimizing js, css, html');

    return gulp
        .src(config.index)
        .pipe($.plumber())
        .pipe($.useref({searchPath: ['./', './src/public']}))
        .pipe($.if('*.js', $.uglify()))
        .pipe($.if('*.css', $.csso()))
        .pipe(gulp.dest(config.build));
    });

gulp.task('serve-build', ['optimize'], function() {
	serve(false);
});

gulp.task('serve-dev', ['inject'], function() {
   serve(true);
});



////////////////////////////////////

function serve(isDev) {
    var nodeOptions = {
        script: config.nodeServer,
        delayTime: 1,
        env: {
            'PORT': port,
            'NODE_ENV': isDev ? 'dev' : 'build'
        },
        watch: [config.server]
    };

    return $.nodemon(nodeOptions)
        .on('restart', ['vet'], function(ev) {
            log('*** nodemon restarted ***');
            log('files changed on restart:\n' + ev);
            setTimeout(function() {
                browserSync.notify('reloading now.');
                browserSync.reload({stream: false});
            }, config.browserReloadDelay);
        })
        .on('start', function() {
            log('*** nodemon started');
            startBrowserSync(isDev);
        })
        .on('crash', function() {
            log('*** nodemon crashed');
        })
        .on('error', function() {
            log('*** nodemon exit');
        });
}

function changeEvent(event) {
    var srcPattern = new RegExp('/.*(?=/' + config.source + ')/');
    log('File ' + event.path.replace(srcPattern,'') + ' ' + event.type);
}

function startBrowserSync(isDev) {
    if(args.nosync || browserSync.active) {
        return;
    }

    log('Starting browser-sync on port ' + port);

    if(isDev) {
	    gulp.watch([config.sass], ['styles'])
	        .on('change', function(ev) { changeEvent(ev);});
    } else {
	    gulp.watch(
          [config.sass, config.js, config.html], 
          ['optimize', browserSync.reload]
        )
	        .on('change', function(ev) { changeEvent(ev);});
    }
    var options = {
        proxy: 'localhost:' + port,
        port: 3000,
        files: isDev ? [
            config.client + '**/*.*',
            '!' + config.sass,
            config.temp + '**/*.css'
        ] : [],
        ghostMode: {
            clicks: true,
            location: true,
            forms: true,
            scroll: true
        },
        injectChanges: true,
        logFileChanges: true,
        logLevel: 'debug',
        logPrefix: 'gulp-patterns',
        notify: true,
        reloadDelay: 1000
    };

    browserSync(options);
}

function errorLogger(error) {
    log('### Error occured ');
    log('error');
    this.emit('end');
}

function clean(path, done) {
    log('Cleaning: ' + $.util.colors.blue(path));
    return del(path, done);
}

function log(msg) {
    if (typeof(msg) === 'object') {
        for (var item in msg) {
            if (msg.hasOwnProperty(item)) {
                $.util.log($.util.colors.blue(msg[item]));
            }
        }
    } else {
        $.util.log($.util.colors.blue(msg));
    }
}
