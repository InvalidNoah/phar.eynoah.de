const webpack = require('webpack'),
  HtmlWebpackPlugin = require('html-webpack-plugin'),
  CopyWebpackPlugin = require('copy-webpack-plugin'),
  BrowserSyncPlugin = require('browser-sync-webpack-plugin'),
  {
    BundleAnalyzerPlugin
  } = require('webpack-bundle-analyzer'),
  path = require('path')

const mode = process.env.NODE_ENV || 'development',
      plugins = []

mode === 'development' &&
  plugins.push(
    // http://localhost:3000
    new BrowserSyncPlugin({
      host: 'localhost',
      port: 3000,
      open: false,
      server: {
        baseDir: ['./']
      }
    }),
    // http://localhost:8888
    new BundleAnalyzerPlugin({
      openAnalyzer: false
    }),
  )

module.exports = {
  mode,
  entry: `${__dirname}/src/index.tsx`,

  output: {
    path: `${__dirname}/build`,
    filename: 'bundle.js',
  },

  devtool: mode === 'production' ? false : 'source-map',

  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.json'],
    alias: {
      'components': path.resolve(__dirname, 'src/components'),
      // 'i18n': path.resolve(__dirname, 'src/i18n'),
      'utils': path.resolve(__dirname, 'src/utils'),
      'actions': path.resolve(__dirname, 'src/actions'),
      'reducers': path.resolve(__dirname, 'src/reducers'),
      'store': path.resolve(__dirname, 'src/store'),
    }
  },

  module: {
    rules: [{
        test: /\.tsx?$/,
        loader: ['ts-loader']
      },
      {
        test: /.pug$/,
        loader: 'pug-loader',
      },
      {
        test: /\.(ico|svg|png|jpg)$/,
        loader: 'file-loader',
        options: {
          name: '[name].[ext]',
          outputPath: 'assets/',
        },
      },
    ]
  },

  optimization: {
    minimize: mode === 'production',
  },

  plugins: [
    new HtmlWebpackPlugin({
      filename: '../index.html',
      template: './src/index.pug',
    }),
    new CopyWebpackPlugin([
      // { from: 'src/assets/locales', to: 'locales' },
      { from: 'src/manifest.json', to: './' },
    ]),
    new webpack.EnvironmentPlugin(['NODE_ENV']),
    ...plugins
  ]
}
