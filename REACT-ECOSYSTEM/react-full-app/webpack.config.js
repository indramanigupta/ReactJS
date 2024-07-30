const path = require("path");
const webpack = require("webpack");
const ReactRefreshWebpackPlugin = require("@pmmmwh/react-refresh-webpack-plugin");
//const { WebpackPluginServe } = require("webpack-plugin-serve");
const isDevelopment = process.env.NODE_ENV !== "production";

module.exports = {
  entry: ["./src/index.js"],
  //mode: "development",
  mode: isDevelopment ? "development" : "production",
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /(node_modules)/,
        loader: "babel-loader",
        //loader: require.resolve("babel-loader"),
        //options: { presets: ["@babel/env"] },
        options: {
          plugins: [
            isDevelopment && require("react-refresh/babel"),
            //isDevelopment && new ReactRefreshWebpackPlugin(),
            //isDevelopment && new WebpackPluginServe(),
          ].filter(Boolean),
        },
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
  resolve: { extensions: [".*", ".js", ".jsx"] },
  output: {
    path: path.resolve(__dirname, "dist/"),
    publicPath: "/dist/",
    filename: "bundle.js",
  },
  devServer: {
    //contentBase: path.join(__dirname, "public/"),
    static: { directory: path.join(__dirname, "public/") },
    port: 3000,
    allowedHosts: ["localhost"],
    devMiddleware: {
      publicPath: "https://localhost:3000/dist/",
    },
    hot: true,
  },
  //plugins: [new webpack.HotModuleReplacementPlugin()],
  plugins: [
    //isDevelopment && new webpack.HotModuleReplacementPlugin(),
    isDevelopment && new ReactRefreshWebpackPlugin(),
  ].filter(Boolean),
};
