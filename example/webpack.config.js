var webpack  = require('webpack');

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
};
