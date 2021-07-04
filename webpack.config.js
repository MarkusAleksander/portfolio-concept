const path = require("path");
// * generate a HTML file
const HtmlWebpackPlugin = require("html-webpack-plugin");
// * Clean up the dist before build
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
// * extract css to file
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const TerserPlugin = require("terser-webpack-plugin");


const config = {
    src_dir: "src",
    output_dir: "dist",
    output_filename: "main.js",
    mode: "development",

    js: {
        input_filename: "index.js",
    },

    html: {
        input_filename: "index.html",
        title: "Portfolio",
    },
};

module.exports = {
    // * entry point of the app - the main file
    entry: `./${config.src_dir}/${config.js.input_filename}`,
    // * list of plugins that will be used
    plugins: [
        new MiniCssExtractPlugin(),
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            // * set html title tag
            title: `${config.html.title}`,
            template: `./${config.src_dir}/${config.html.input_filename}`,
        }),
    ],
    // * create source maps for debugging
    devtool: "inline-source-map",
    // * where to output the bundle
    output: {
        filename: `${config.output_filename}`,
        // * path of the output
        path: path.resolve(__dirname, `${config.output_dir}`),
    },
    mode: `${config.mode}`,
    // * specify where to run the webpack dev server from
    devServer: {
        contentBase: `./${config.output_dir}`,
        hot: true,
        writeToDisk: true,
        open: "chrome",
        index: `index.html`,
        compress: true,
    },
    module: {
        // * create a rule to handle import within a JS module
        rules: [
            // * Handling CSS
            {
                // * test the file type
                test: /\.css$/,
                // * matching files are then sent to the below plugins
                use: ["style-loader", "css-loader", "postcss-loader"]
            },
            // * Handling SCSS
            {
                test: /\.scss$/,
                use: [MiniCssExtractPlugin.loader, "css-loader",
                    "postcss-loader",
                    "sass-loader"],
            },
            // * Handling images
            {
                test: /\.(png|jpg|svg|gif)$/,
                use: ["file-loader"],
            },
        ],
    },
    optimization: {
        minimize: true,
        minimizer: [
            // For webpack@5 you can use the `...` syntax to extend existing minimizers (i.e. `terser-webpack-plugin`), uncomment the next line
            // `...`,
            new CssMinimizerPlugin(),
            new TerserPlugin(),
        ],
    },
};
