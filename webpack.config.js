const path = require('path')

module.exports = {
  mode: 'development',
  entry: './public/js/schedule.js',
  resolve: {
    extensions: [ '.js' ]
  },
  output: {
    filename: 'schedule.js',
    path: path.join(__dirname,'./public/js','dist')
  },
  devtool: 'sourcemap',
  target: 'node',
  node: {
    fs: 'empty',
    net: 'empty',
    tls: 'empty',
  },
}