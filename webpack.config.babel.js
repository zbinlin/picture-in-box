"ues strict";

import path from "path";

module.exports = {
    entry: [
        "./src/bootstrap.js"
    ],
    output: {
        path: path.join(__dirname, "./dist"),
        publicPath: "/",
        filename: "bundle.js"
    },
    devtool: "inline-source-map",
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules|dist/,
                loaders: ["react-hot", "babel?cacheDirectory&presets[]=react&babelrc=false"]
            },
            {
                test: /\.s[ac]ss$/,
                exclude: /node_modules|dist/,
                loaders: ["style", "css?modules&sourceMap", "sass?sourceMap"]
            }
        ]
    },
    resolve: {
        extensions: ["", ".webpack.js", ".web.js", ".js", ".jsx"]
    }
}
