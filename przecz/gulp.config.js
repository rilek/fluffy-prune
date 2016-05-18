module.exports = function () {
    var client = './src/public/';
    var clientApp = client + 'app/';
    var server = './src/server/';
    var temp = './.tmp/';

    var config = {
        alljs: [
        './src/**/*.js',
        './*.js',
        '!' + client + '/lib/**',
        ],
        build: './build/',
        client: client,
        index: client + 'index.html',
        css: temp + 'styles.css',
        html: clientApp + '**/*.html',
        js: [
        clientApp + '**/*.js',
        client + 'lib/R/js/*.js',
        client + 'assets/**/main.js',
        client + 'assets/**/canvasGrid.js',
        client + 'assets/**/canvas.js',
        client + 'assets/**/*.js',
        '!' + clientApp + '**/*.spec.js'
        ],
        sass: client + '/assets/sass/styles.scss',
        server: server,
        temp: temp,

        browserReloadDelay: 1000,

        bower: {
            json: require('./bower.json'),
            directory: './src/public/lib/',
            ignorePath: '../..'
        },

        defaultPort: 7203,
        nodeServer: './src/server/app.js'
    };

    config.getWiredepDefaultOptions = function() {
        var options = {
            bowerJson: config.bower.json,
            directory: config.bower.directory,
            ignorePath: config.bower.ignorePath
        };
        return options;
    };

    return config;
};


