const path = require('path');
const webpack = require('webpack');
const HtmlPlugin = require('html-webpack-plugin');
const ScriptExtHtmlPlugin = require('script-ext-html-webpack-plugin');
const SWPrecachePlugin = require('sw-precache-webpack-plugin');
const ExtractCssChunksPlugin = require('extract-css-chunks-webpack-plugin');
const FlushCssChunksPlugin = require('flush-css-chunks-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const autoprefixer = require('autoprefixer');
const cssMQPacker = require('css-mqpacker');

const isProduction = () => process.env.NODE_ENV === 'production';

const isDevelopment = () => !isProduction();

const isBundleAnalyzer = () => !!process.env.BUNDLE_ANALYZER;

const BUILD = path.join(__dirname, '../server/public/');
const SRC = path.join(__dirname, 'src/');

module.exports = {
  entry: {
    app: ['babel-polyfill', './src/index.js'],
    vendor: ['react', 'react-dom', 'react-router-dom', 'react-loadable', 'react-redux', 'redux', 'redux-thunk']
  },

  output: {
    path: BUILD,
    filename: isDevelopment() ? '[name].build.[hash:8].js' : '[name].build.[chunkhash:8].js',
    chunkFilename: '[name].build.[chunkhash:8].js',
    publicPath: '/'
  },

  resolve: {
    modules: [path.resolve('./src'), 'node_modules'],
    symlinks: false,
    cacheWithContext: false,
    alias: {
      'actions': path.join(SRC, 'actions/'),
      'comps': path.join(SRC, 'comps/'),
      'managers': path.join(SRC, 'managers/'),
      'reducers': path.join(SRC, 'reducers/'),
      'selectors': path.join(SRC, 'selectors/'),
      'utils': path.join(SRC, 'utils/'),
      'assets': path.resolve(__dirname, 'assets/')
    }
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ['thread-loader', 'cache-loader', 'babel-loader']
      },
      {
        test: /\.(jpe?g|png|gif|svg|pdf|ico)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: './[path][name]-[hash:8].[ext]',
              limit: 100000
            }
          }
        ]
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2)$/,
        loader: 'file-loader?name=./fonts/[name].[ext]'
      },
      {
        test: /\.styl$/,
        use: ExtractCssChunksPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
              options: {
                modules: true,
                localIdentName: '[name]__[local]--[hash:base64:5]',
                camelCase: true,
                minimize: isProduction(),
                sourceMap: true
              }
            },
            {
              loader: 'postcss-loader',
              options: {
                plugins: () => [autoprefixer({ browsers: ['>= 10%', 'last 2 versions'] }), cssMQPacker()],
                sourceMap: true
              }
            },
            {
              loader: 'stylus-loader',
              options: {
                import: [path.resolve('./src/stylus_vars/vars.styl')],
                sourceMap: true
              }
            }
          ]
        })
      },
      {
        test: /\.css$/,
        use: ExtractCssChunksPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
              options: { minimize: isProduction() }
            }
          ]
        })
      }
    ]
  },

  plugins: [
     new webpack.DefinePlugin({
      'process.env.NODE_ENV': isDevelopment() ? '"development"' : '"production"'
    }),

    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),

    new webpack.optimize.CommonsChunkPlugin({ name: 'vendor' }),
    new webpack.optimize.CommonsChunkPlugin({ name: 'meta' }),

    ...[isBundleAnalyzer() ? () => {} : new webpack.optimize.ModuleConcatenationPlugin()],

    ...[
      isDevelopment()
        ? () => {}
        : new webpack.optimize.UglifyJsPlugin({
          beautify: false,
          comments: false,
          sourceMap: true,
          compress: {
            sequences: true,
            booleans: true,
            loops: true,
            unused: true,
            warnings: false,
            unsafe: true
          }
        })
    ],

    ...[
      isDevelopment()
        ? () => {}
        : new SWPrecachePlugin({
          cacheId: 'catalog',
          filename: 'sw.js',
          minify: true,
          dontCacheBustUrlsMatching: /\.\w{8}\./,
          staticFileGlobsIgnorePatterns: [/\.map$/, /manifest\.json$/]
        })
    ],

    new HtmlPlugin({
      template: './src/index.html',
      filename: 'index.html',
      favicon: './assets/icons/favicon.png',
      inject: 'body',
      minify: {
        collapseWhitespace: true,
        keepClosingSlash: true,
        minifyCSS: true,
        minifyJS: true,
        removeComments: true,
        removeScriptTypeAttributes: true,
        removeStyleLinkTypeAttributes: true
      }
    }),

    new ExtractCssChunksPlugin({
      filename: '[name].build.[contenthash:8].css',
      disable: isDevelopment()
    }),
    new FlushCssChunksPlugin(),

    new ScriptExtHtmlPlugin({
      inline: ['meta'],
      defer: ['vendor', 'app'],
      defaultAttribute: 'async'
    }),

    ...[isDevelopment() ? new webpack.NamedModulesPlugin() : () => {}],
    ...[isDevelopment() ? new webpack.HotModuleReplacementPlugin() : () => {}],

    ...[isBundleAnalyzer() ? new BundleAnalyzerPlugin() : () => {}]
  ],

  devtool: isDevelopment() ? 'cheap-module-eval-source-map' : 'source-map',

  devServer: {
    contentBase: BUILD,
    proxy: {
    /*   '/api': {
        target: 'https://dev.tender.orbita.center/',
        changeOrigin: true
      },
      '/uaa': {
        target: 'https://dev.tender.orbita.center/',
        changeOrigin: true
      } */
    },
    headers: { 'Access-Control-Allow-Origin': '*' },
    hot: true,
    historyApiFallback: true,
    compress: true,
    overlay: {
      warnings: false,
      errors: true
    },
    stats: {
      children: false,
      modules: false
    }
  },

  stats: {
    children: isBundleAnalyzer(),
    modules: isBundleAnalyzer()
  }
};
