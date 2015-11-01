"ues strict";

import path from "path";

module.exports = {
    entry: "./src/bootstrap.js",
    output: {
        path: path.join(__dirname, "./dist"),
        filename: "bundle.js"
    },
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules|dist/,
                loader: "babel",
                query: {
                    cacheDirectory: true,
                    presets: [/*"es2015", */"react"],
                    babelrc: false
                }
            },
            {
                test: /\.s[ac]ss$/,
                exclude: /node_modules|dist/,
                loader: "style!css?modules!sass"
            }
        ]
    },
    resolve: {
        extensions: ["", ".webpack.js", ".web.js", ".js", ".jsx"]
    }
}
