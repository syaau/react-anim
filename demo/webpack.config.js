var fs = require('fs');
var path = require('path');
var webpack = require('webpack');

module.exports = {
  devtool: 'inline-source-map',
  entry: fs.readdirSync(__dirname).reduce(function(entries, dir) {
    if(fs.statSync(path.join(__dirname, dir)).isDirectory()) {
      entries[dir] = path.join(__dirname, dir, 'demo.js')
    }
    return entries;
  }, {}),
  output: {
    path: __dirname + '/__build__',
    filename: '[name].js',
    chunkFilename: '[id].chunk.js',
    publicPath: '/__build__/'
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel',
        query: {
          presets: [ 'react', 'es2015', 'stage-0']
        }
      }, {
        test: /\.css$/,
        loader: 'style!css'
      }, {
        test: /\.png$/,
        loader: 'file'
      }
    ],
    postLoaders: [
      { loader: "transform?brfs" }
    ]
  },
  resolve: {
    alias: {
      'react-animation': path.join(__dirname, '..', 'src')
    }
  },

  plugins: [
    new webpack.optimize.CommonsChunkPlugin('shared.js'),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development')
    })
  ]
}
