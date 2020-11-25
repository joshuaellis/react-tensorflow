module.exports = (app, options) => {
  const isProd = process.env.NODE_ENV != 'dev'

  if (isProd) {
    const addProdMiddlewares = require('./addProdMiddleware')
    addProdMiddlewares(app, options)
  } else {
    const webpackConfig = require('./../../webpack/webpack.dev.babel')
    const addDevMiddlewares = require('./addDevMiddleware')
    addDevMiddlewares(app, webpackConfig)
  }

  return app
}
