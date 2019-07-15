const webpack = require('webpack');
const path = require('path');
const nodeExternals = require('webpack-node-externals');

module.exports = {
  entry: './src/index.ts',
  module: {
    rules: [
      {
        test: /\.ts?$/,
        use: 'ts-loader',
        exclude: /node_modules/
      }
    ]
  },
  devtool: "source-map",
  target: 'node',
  externals: [nodeExternals()],
  plugins: [
    new webpack.ContextReplacementPlugin(
      /Sequelize(\\|\/)/,
      path.resolve(__dirname, '../src')
    )
  ],
  resolve: {
    extensions: ['.ts', '.js', 'json'],
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  }
};
