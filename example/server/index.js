const express = require('express')
const path = require('path')

const setup = require('./middleware')

const clientPort = process.env.PORT || 3000

const __root = path.resolve(__dirname, '../')

const startClient = () => {
  const app = express()

  app.get('/api/model', (_, res) => {
    res.status(200).sendFile(path.join(__root, '/public/model/model.json'))
  })

  app.get('/api/*.bin', (req, res) => {
    const { params } = req
    const [weight] = Object.values(params)
    res.status(200).sendFile(path.join(__root, `/public/model/${weight}.bin`))
  })

  setup(app, {
    outputPath: path.resolve(process.cwd(), 'public'),
    publicPath: '/'
  })

  app.listen(clientPort, () => {
    console.log(`  > Running express on port: ${clientPort}`)
  })
}

startClient()
