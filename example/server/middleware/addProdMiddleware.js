const path = require('path')
const express = require('express')

module.exports = function addProdMiddlewares (app, options) {
  const publicPath = options.publicPath || '/'
  const outputPath = path.resolve(process.cwd(), 'dist')

  app.use(publicPath, express.static(outputPath))

  app.get('*', (req, res) =>
    res.sendFile(path.resolve(outputPath, 'index.html'))
  )
}
