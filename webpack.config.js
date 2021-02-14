const path = require("path");
const autoprefixer = require('autoprefixer');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: ["babel-polyfill","./src/index.js"],

    output: {
        filename: "bundle.js",
        publicPath: "/public",
        path: path.resolve(__dirname, "public")
    },
    
    devtool: "eval",
    devServer: {
        proxy: [{
            path: "/api/",
            target: "http://localhost:3001"
        }],
        inline: true,
        hot: true,
        historyApiFallback: true
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: [["@babel/preset-env", {"targets": { "node": "current", "ie": "11" }}], "@babel/preset-react"],
                        plugins: ["@babel/plugin-proposal-class-properties"]
                    }
                }
            },
            {
                test: /\.sass|scss|css$/i,
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: [
                        {
                            loader: "css-loader?url=true"
                        },
                        {
                            loader: "postcss-loader",
                            options:{
                                plugins: [
                                    autoprefixer({
                                        overrideBrowserslist: ["last 4 versions"]
                                    })
                                ]
                            }
                        },
                        "sass-loader"
                    ]
                })},
            {
                test: /\.(jpe?g|png|gif|woff|woff2|eot|ttf|svg)(\?[a-z0-9=.]+)?$/,
                loader: 'url-loader?limit=100000'
            }
        ],
    },
    plugins: [
        new ExtractTextPlugin({filename: 'style.css'}),
        new HtmlWebpackPlugin({
            filename: path.join(__dirname, '/public/index.html'),
            hash: true,
            inject: false,
            template: path.join(__dirname, '/index.html'),
        })
    ]
};