const { join } = require('path')
const BabiliPlugin = require("babili-webpack-plugin")

let config = {
  target: 'electron',
  devtool: 'eval-source-map',

  entry: {
    'app': './src/bootstrap.jsx'
  },

  output: {
    path: join(__dirname, 'build'),
    filename: '[name].bundle.js'
  },

  devServer: {
    contentBase: './',
    publicPath: 'http://localhost:8080/build/'
  },

  module: {
    rules: [
      {
        test: /\.(scss)$/,
        include: join(__dirname, 'src'),
        exclude: /node_modules/,
        use: [
          {
            loader: 'style-loader'
          }, {
            loader: 'css-loader',
            options: {
              sourceMap: true
            }
          }, {
            loader: 'sass-loader',
            options: {
              sourceMap: true
            }
          }
        ]
      }, {
        test: /\.(png|gif|jpg|woff2|tff)$/,
        include: join(__dirname, 'src'),
        exclude: /node_modules/,
        use: [
          {
            loader: 'url-loader'
          }
        ]
      }, {
        test: /\.(jsx)$/,
        include: join(__dirname, 'src'),
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader'
          }
        ]
      }
    ]
  },

  plugins: [],

  resolve: {
    modules: ['node_modules'],
    extensions: ['.js', '.jsx']
  }
}

if (process.env.NODE_ENV === 'production') {
  config.plugins.push(new BabiliPlugin())
  config.devtool = 'cheap-module-source-map'
}

module.exports = config
