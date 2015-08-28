var gulp = require("gulp");
var gutil = require("gulp-util");
var webpack = require("webpack");
var WebpackDevServer = require("webpack-dev-server");

var webpackConfig = {
  module: {
    loaders: [
              { test: /\.frag$/, loader: 'shader' },
              { test: /\.vert$/, loader: 'shader' },
    ],
  },
  glsl: {
        chunkPath: "chunks"
  },
  entry: "./src/application.js",
  output: {
    path: __dirname,
    filename: "./public/application.js"
  }
}

gulp.task("default", function(callback) {
    // run webpack
    webpack(webpackConfig
    , function(err, stats) {
        if(err) throw new gutil.PluginError("webpack", err);
        gutil.log("[webpack]", stats.toString({
            // output options
        }));
        callback();
    }); });

gulp.task("webpack-dev-server", function(callback) {
    // Start a webpack-dev-server
    var compiler = webpack(webpackConfig);

    new WebpackDevServer(compiler, {
        // server and middleware options
    }).listen(8080, "0.0.0.0", function(err) {
        if(err) throw new gutil.PluginError("webpack-dev-server", err);
        // Server listening
        gutil.log("[webpack-dev-server]", "http://localhost:8080/webpack-dev-server/index.html");

        // keep the server alive or continue?
        // callback();
    });
});
