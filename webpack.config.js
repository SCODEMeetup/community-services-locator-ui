const path = require('path');
const webpack = require('webpack');

const Dotenv = require('dotenv-webpack');
const FileManagerPlugin = require('filemanager-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const DEFAULT_PORT = parseInt(process.env.PORT, 10) || 3000;
const HOST = process.env.HOST || 'localhost';
const PROTOCOL = process.env.HTTPS === 'true' ? 'https' : 'http';

// I am hoping these get cleaned up for webpack 4
// or is no longer needed for a css chunk in the future of webpack
// const ExtractTextPlugin = require('extract-text-webpack-plugin');
// const extractCSS = new ExtractTextPlugin('style.css');

module.exports = ({ prod } = {}) => {
  const cssLoaders = [
    {
      loader: 'css-loader',
      options: {
        camelCase: true,
        importLoaders: 1,
        localIdentName: '[name]--[local]--[hash:base64:8]',
        modules: true,
        sourceMap: !prod,
      },
    },
    'postcss-loader',
  ];

  // const proxy = {
  //   '/manager/api': {
  //     changeOrigin: true,
  //     secure: true,
  //     target: 'https://google.com',
  //   },
  // };

  return {
    bail: prod,
    devServer: {
      contentBase: path.resolve(__dirname, 'public'),
      historyApiFallback: true,
      host: HOST,
      hot: true,
      https: PROTOCOL === 'https',
      port: DEFAULT_PORT,
      // proxy,
      publicPath: '/',
      disableHostCheck: true,
    },
    entry: prod
      ? ['./src/renderer/index']
      : ['react-hot-loader/patch', './src/renderer/index'],
    mode: prod ? 'production' : 'development',
    module: {
      rules: [
        //   {
        //     enforce: 'pre',
        //     test: /\.jsx|js($|\?)/,
        //     use: 'eslint-loader',
        //     include: [
        //       path.resolve(__dirname, 'src'),
        //     ],
        //   },
        {
          test: /\.jsx|js($|\?)/,
          use: 'babel-loader',
          exclude: [path.resolve(__dirname, 'node_modules')],
        },
        {
          test: /\.scss$/,
          use: [
            {
              loader: 'style-loader',
            },
            {
              loader: 'css-loader',
            },
            {
              loader: 'sass-loader',
            },
          ],
        },
        {
          test: /\.css($|\?)/,
          // use: extractCSS.extract({
          //   fallback: 'style-loader',
          //   use: cssLoaders,
          // }),
          use: ['style-loader', ...cssLoaders],
        },
        {
          test: /\.svg$/,
          use: 'raw-loader',
          exclude: [
            path.resolve(__dirname, 'src/renderer/containers/app/fonts'),
          ],
        },
        {
          test: /\.(ttf|eot|woff|woff2|svg|png)$/,
          use: {
            loader: 'file-loader',
          },
          include: [
            path.resolve(__dirname, 'src/renderer/containers/app/fonts'),
          ],
        },
      ],
    },
    node: {
      fs: 'empty',
      net: 'empty',
      tls: 'empty',
    },
    optimization: {
      splitChunks: {
        chunks: 'all',
      },
      runtimeChunk: true,
    },
    output: {
      filename: 'bundle.js',
      path: path.resolve(__dirname, 'dist'),
      publicPath: '/',
    },
    plugins: [
      ...(prod
        ? [
            new FileManagerPlugin({
              onEnd: {
                copy: [
                  {
                    source: path.resolve(__dirname, 'public', '*'),
                    destination: path.resolve(__dirname, 'dist'),
                  },
                ],
              },
            }),
          ]
        : [new webpack.HotModuleReplacementPlugin()]),
      // extractCSS,
      new webpack.DefinePlugin({
        'process.env': {
          NODE_ENV: JSON.stringify(process.env.NODE_ENV),
        },
      }),
      new HtmlWebpackPlugin({
        fileName: 'index.html',
        template: './src/renderer/index.html',
      }),
      new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
      new Dotenv({
        path: prod
          ? path.resolve(__dirname, '.env.production')
          : path.resolve(__dirname, '.env.development'),
      }),
    ],
    resolve: {
      extensions: ['.js', '.jsx', '.json', '.css', '.node'],
      alias: {
        components: path.resolve(__dirname, 'src', 'renderer', 'components'),
        containers: path.resolve(__dirname, 'src', 'renderer', 'containers'),
        'redux-middleware': path.resolve(
          __dirname,
          'src',
          'renderer',
          'redux',
          'middleware'
        ),
        'redux-modules': path.resolve(
          __dirname,
          'src',
          'renderer',
          'redux',
          'modules'
        ),
        root: __dirname,
        scenes: path.resolve(__dirname, 'src', 'renderer', 'scenes'),
        src: path.resolve(__dirname, 'src'),
        test: path.resolve(__dirname, 'test'),
      },
    },
    target: 'web',
  };
};
