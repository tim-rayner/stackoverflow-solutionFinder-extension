const path = require("path");
const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
  mode: "development",
  entry: {
    contentScript: "./src/contentScript.ts", // Entry point for TypeScript code
    background: "./src/background.ts",
  },
  output: {
    filename: "[name].js", // Output JavaScript files with the same name as the entry
    path: path.resolve(__dirname, "dist"), // Output directory
  },
  resolve: {
    extensions: [".ts", ".js"], // Resolve both TypeScript and JavaScript files
  },
  module: {
    rules: [
      {
        test: /\.ts$/, // Use ts-loader for all TypeScript files
        use: "ts-loader",
        exclude: /node_modules/,
      },
    ],
  },
  devtool: "source-map", // Enable sourcemaps for easier debugging
  plugins: [
    new CopyPlugin({
      patterns: [
        { from: "manifest.json", to: "manifest.json" },
        { from: "icons", to: "icons" },
      ],
    }),
  ],
};
