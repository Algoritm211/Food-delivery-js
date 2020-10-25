const path = require('path');

module.exports = {
    mode: 'development',
    entry: './js/script.js',
    output: {
        filename: 'bundle.js',
        path: __dirname + '/js'
    },

    watch: true,

    devtool: "eval-source-map",

    module: {}
}