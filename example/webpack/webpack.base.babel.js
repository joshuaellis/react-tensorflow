const path = require('path')
const webpack = require('webpack')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

const __root = path.resolve(__dirname, '../')

console.log(path.resolve(__root, './src/components/'))

module.exports = options => ({
  mode: options.mode,
  entry: options.entry,
  output: Object.assign(
    {
      path: path.resolve(__root, 'dist'),
      publicPath: '/'
    },
    options.output
  ),
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
    alias: {
      components: path.resolve(__root, './src/components/'),
      containers: path.resolve(__root, './src/containers/'),
      env: path.resolve(__root, './env'),
      helpers: path.resolve(__root, './src/helpers/'),
      hooks: path.resolve(__root, './src/hooks/'),
      reducers: path.resolve(__root, './src/reducers/'),
      references: path.resolve(__root, './src/references/')
    }
  },
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.ts(x?)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader'
          },
          {
            loader: 'ts-loader'
          }
        ]
      },
      {
        test: /\.js(x?)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader'
          }
        ]
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: 'html-loader'
          }
        ]
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader', 'postcss-loader']
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    ...options.plugins
  ],
  devtool: options.devtool,
  target: 'web',
  performance: options.performance || {}
})
