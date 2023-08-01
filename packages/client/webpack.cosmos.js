const path = require('node:path');
const webpack = require('webpack');

module.exports = (webpackConfig) => ({
  ...webpackConfig,
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
    alias: {
      app: path.resolve(process.cwd(), './src/main/app'),
      page: path.resolve(process.cwd(), './src/main/page'),
      widget: path.resolve(process.cwd(), './src/main/widget'),
      feature: path.resolve(process.cwd(), './src/main/feature'),
      entity: path.resolve(process.cwd(), './src/main/entity'),
      shared: path.resolve(process.cwd(), './src/main/shared'),
    },
  },
  plugins: [
    new webpack.DefinePlugin({
      'import.meta.env': JSON.stringify({ MODE: process.env.NODE_ENV }),
    }),
  ],
});
