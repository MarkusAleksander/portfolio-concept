const path = require("path");

module.exports = {
    // * entry point of the app - the main file
    entry: "./src/index.js",
    // * where to output the bundle
    output: {
        filename: "main.js",
        // * path of the output
        path: path.resolve(__dirname, "dist"),
    },
    mode: "development",
    devServer: {
        contentBase: "./dist",
    },
    module: {
        // * create a rule to handle import within a JS module
        rules: [
            // * Handling CSS
            {
                // * test the file type
                test: /\.css$/,
                // * matching files are then sent to the below plugins
                use: ["style-loader", "css-loader"],
            },
            // * Handling SCSS
            {
                test: /\.scss$/,
                use: ["style-loader", "css-loader", "sass-loader"],
            },
            // * Handling images
            {
                test: /\.(png|jpg|svg|gif)$/,
                use: ["file-loader"],
            },
        ],
    },
};
