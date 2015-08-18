var gulp = require("gulp");
var gutil = require("gulp-util");
var webpack = require("webpack");
var WebpackDevServer = require("webpack-dev-server");

gulp.task("default", function(callback) {
    // run webpack
    webpack({
      entry: "./src/application.js",
      output: {
        path: __dirname,
        filename: "./public/application.js"
      },
    }, function(err, stats) {
        if(err) throw new gutil.PluginError("webpack", err);
        gutil.log("[webpack]", stats.toString({
            // output options
        }));
        callback();
    }); })
