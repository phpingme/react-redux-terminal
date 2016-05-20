var webpack  = require('webpack');
var path = require('path');

module.exports = {
  entry: __dirname + '/index.js',
  output: {
    path: __dirname,
    filename: 'bundle.js',
  },
  module: {
    loaders: [
     { test: /\.js?$/, loader: 'babel', query: {
       presets: ['es2015', 'stage-0', 'react'],
     },
     },
    ],
  },
  plugins: [
    new webpack.optimize.DedupePlugin(),
  ],
  watchOptions: {
    poll: 1000,
    aggregateTimeout: 1000,
  },
  resolve: {
    alias: {
      'react-redux-terminal': path.join(__dirname, '..'),
    },
    root: [
      path.resolve('../node_modules'),
    ],
  },
};
