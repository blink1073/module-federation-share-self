const HtmlWebpackPlugin = require("html-webpack-plugin");
const ModuleFederationPlugin = require("webpack").container
  .ModuleFederationPlugin;
const path = require("path");

module.exports = {
  entry: "./index",
  mode: "development",
  devServer: {
    contentBase: path.join(__dirname,
        "dist"),
    port: 3003,
    },
  output: {
    publicPath: "http://localhost:3003/",
    },
  plugins: [
    new ModuleFederationPlugin({
      name: "app",
      library: { type: "var", name: "app"
            },
      filename: "remoteEntry.js",
      exposes: {
                "./index": "./index",
            },
      shared: {
            "app": { singleton: true },
            "react": { singleton: true }
        },
      }),
    new HtmlWebpackPlugin({
      template: "./public/index.html",
        }),
    ],
};
