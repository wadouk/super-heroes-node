var webpack = require('webpack');
var path = require("path");
var merge = require('webpack-merge');
var validator = require('webpack-validator');
var glob = require("glob");
var fs = require("fs");

const PATHS = {
  src: glob.sync("./sources/index.jsx"),
  public: path.join(__dirname, 'sources/'),
};

function override() {
  try {
    return ({
      "dev": () => ({
        context: __dirname,
        entry: PATHS.src,
        devtool: "inline-source-map",
        output: {
          sourceMapFilename: "bundle.js.map",
        },
        devServer: {
          contentBase: PATHS.public,
          proxy: {
            "/api": {
              target: "http://comicvine.gamespot.com/api/",
              pathRewrite: {'^/api': ''}
            }
          }
        }
      })
    }
    )[process.env.npm_lifecycle_event]()
  } catch (e) {
    console.warn("WARN : Seems strange, no env found, use npm run instead");
    return {}
  }
}


module.exports = validator(merge({
  module: {
    loaders: [{
      test: /\.jsx?$/, exclude: /(node_modules)/, loader: 'babel-loader',
    },{
      test: /\.json$/, loader: 'json-loader',
    }]
  },
  output: {
    filename: "bundle.js",
  }
}, override()));
