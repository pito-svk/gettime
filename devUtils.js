const webpack = require('webpack')
const devWebpackConfig = require('./webpack.config.dev.js')
const webpackDevMiddleware = require('webpack-dev-middleware')
const webpackHotMiddleware = require('webpack-hot-middleware')

function initCompiler () {
  return webpack(devWebpackConfig)
}

exports.compileAndHotReload = app => {
  const compiler = initCompiler()

  app.use(webpackDevMiddleware(compiler, {
    noInfo: true,
    hot: true,
    publicPath: '/'
  }))

  app.use(webpackHotMiddleware(compiler, {
    log: console.log,
    hot: true,
    reload: true
  }))
}
