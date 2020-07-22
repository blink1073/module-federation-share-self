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
      name: "module-federation-share-self",
      library: {
        type: "var", name: "module-federation-share-self"
            },
      filename: "remoteEntry.js",
      exposes: {
                "./index": "./index",
            },
      shared: {
        "./index": {
            shareKey: "module-federation-share-self",
            version: require("./package.json").version,
            singleton: true
          },
            "react": { singleton: true }
        },
      }),
    new HtmlWebpackPlugin({
      template: "./public/index.html",
        }),
    ],
};
