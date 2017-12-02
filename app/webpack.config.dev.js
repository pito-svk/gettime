const webpack = require('webpack')

const autoprefixer = require('autoprefixer')
const path = require('path')
const srcPath = path.resolve(__dirname, './src')
const buildPath = path.resolve(__dirname, './build')
const indexPath = path.resolve(__dirname, './src/index.js')
const nodeModulesPath = path.resolve(__dirname, './node_modules')
const packageJsonPath = path.resolve(__dirname, './package.json')
const appHtmlPath = path.resolve(__dirname, './public/index.html')
const ModuleScopePlugin = require('react-dev-utils/ModuleScopePlugin')
const WatchMissingNodeModulesPlugin = require('react-dev-utils/WatchMissingNodeModulesPlugin')
const InterpolateHtmlPlugin = require('react-dev-utils/InterpolateHtmlPlugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const eslintFormatter = require('react-dev-utils/eslintFormatter')

const REACT_APP = /^REACT_APP_/i

const raw = Object.keys(process.env)
    .filter(key => REACT_APP.test(key))
    .reduce(
      (env, key) => {
        env[key] = process.env[key]
        return env
      },
  {
    NODE_ENV: process.env.NODE_ENV || 'development',
    PUBLIC_URL: ''
  }
    )

process.env.NODE_PATH = (process.env.NODE_PATH || '')
  .split(path.delimiter)
  .filter(folder => folder && !path.isAbsolute(folder))
  .join(path.delimiter)

module.exports = {
  devtool: 'eval',
  context: srcPath,
  entry: {
    app: [
      'babel-polyfill/dist/polyfill.js',
      'react-hot-loader/patch',
      'babel-plugin-transform-object-rest-spread',
      'webpack-hot-middleware/client?noInfo=false',
      indexPath
    ]
  },
  output: {
    pathinfo: true,
    filename: 'static/js/bundle.js',
    chunkFilename: 'static/js/[name].chunk.js',
    path: buildPath,
    publicPath: '/',
    devtoolModuleFilenameTemplate: info => path.resolve(info.absoluteResourcePath).replace(/\\/g, '/')
  },
  resolve: {
    extensions: ['.web.js', '.mjs', '.js', '.json', '.web.jsx', '.jsx'],
    modules: ['node_modules', nodeModulesPath].concat(
      process.env.NODE_PATH.split(path.delimiter).filter(Boolean)
    ),
    alias: {
      'babel-runtime': path.dirname(
        require.resolve('babel-runtime/package.json')
      ),
      'react-native': 'react-native-web'
    },
    plugins: [
      new ModuleScopePlugin(srcPath, [packageJsonPath])
    ]
  },
  module: {
    strictExportPresence: true,
    rules: [
      {
        test: /\.(js|jsx|mjs)$/,
        enforce: 'pre',
        use: [
          {
            options: {
              formatter: eslintFormatter,
              eslintPath: require.resolve('eslint'),
              // @remove-on-eject-begin
              baseConfig: {
                extends: [require.resolve('eslint-config-react-app')]
              },
              ignore: false,
              useEslintrc: false
              // @remove-on-eject-end
            },
            loader: require.resolve('eslint-loader')
          }

        ],
        include: srcPath
      },
      {
        oneOf: [
          {
            test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
            loader: require.resolve('url-loader'),
            options: {
              limit: 10000,
              name: 'static/media/[name].[hash:8].[ext]'
            }
          },
          {
            test: /\.(js|jsx|mjs)$/,
            include: srcPath,
            loader: require.resolve('babel-loader'),
            options: {
              babelrc: false,
              presets: [require.resolve('babel-preset-react-app')],
              cacheDirectory: true
            }
          },
          {
            test: /\.css$/,
            use: [
              require.resolve('style-loader'),
              {
                loader: require.resolve('css-loader'),
                options: {
                  importLoaders: 1
                }
              },
              {
                loader: require.resolve('postcss-loader'),
                options: {
                  ident: 'postcss',
                  plugins: () => [
                    require('postcss-flexbugs-fixes'),
                    autoprefixer({
                      browsers: [
                        '>1%',
                        'last 4 versions',
                        'Firefox ESR',
                        'not ie < 9'
                      ],
                      flexbox: 'no-2009'
                    })
                  ]
                }
              }
            ]
          },
          {
            exclude: [/\.js$/, /\.html$/, /\.json$/],
            loader: require.resolve('file-loader'),
            options: {
              name: 'static/media/[name].[hash:8].[ext]'
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new InterpolateHtmlPlugin(raw),
    new HtmlWebpackPlugin({
      inject: true,
      template: appHtmlPath
    }),
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new WatchMissingNodeModulesPlugin(nodeModulesPath),
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/)
  ],
  node: {
    dgram: 'empty',
    fs: 'empty',
    net: 'empty',
    tls: 'empty',
    child_process: 'empty'
  },
  performance: {
    hints: false
  }
}
