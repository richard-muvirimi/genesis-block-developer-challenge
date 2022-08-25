/**Ignore convert suggestion */
const path = require("path");
const webpack = require("webpack");

module.exports = {
    mode: "development",
    entry: ["./ui/src/index.js"],
    output: {
        filename: "[name].js",
        path: path.resolve(__dirname, "ui/build"),
    },
    module: {
        rules: [
            //Disable module support
            { parser: { amd: false } },
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                loader: "babel-loader",
                options: {
                    presets: [
                        ["@babel/preset-env", { targets: { node: "current" } }],
                        [
                            "@babel/preset-react",
                            { targets: "defaults", runtime: "automatic" },
                        ],
                    ],
                },
            },
        ],
    },
    plugins: [
        // fix "process is not defined" error:
        // (do "npm install process" before running the build)
        new webpack.ProvidePlugin({
            React: "react",
        }),
        new webpack.ProvidePlugin({
            process: "process/browser",
        }),
    ],
};
