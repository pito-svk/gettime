const webpack = require('webpack')
const devWebpackConfig = require('./webpack.config.dev.js')
const webpackDevMiddleware = require('webpack-dev-middleware')
const webpackHotMiddleware = require('webpack-hot-middleware')
const path = require('path')

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

  app.use('*', function (req, res, next) {
    var filename = path.join(compiler.outputPath, 'index.html')
    compiler.outputFileSystem.readFile(filename, function (err, result) {
      if (err) {
        return next(err)
      }
      res.set('content-type', 'text/html')
      res.send(result)
      res.end()
    })
  })
}
