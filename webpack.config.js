const path = require("path");

module.exports = {
    devtool: "inline-source-map",
    entry: "./src/Game.ts",
    mode: "none",
    module: {
        rules: [
            {
                exclude: /node_modules/,
                test: /\.ts$/,
                use: "ts-loader",
            },
        ],
    },
    output: {
        filename: "bundle.js",
        path: path.resolve(__dirname, "dist/app"),
    },
    resolve: {
        extensions: [ ".tsx", ".ts", ".js" ],
    },
};