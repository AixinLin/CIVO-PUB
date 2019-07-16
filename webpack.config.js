const path = require('path')

module.exports = {
  mode: 'development',
  entry: './public/js/courses.js',
  resolve: {
    extensions: [ '.js' ]
  },
  output: {
    filename: 'courses.js',
    path: path.join(__dirname,'./public/js','dist')
  },
  devtool: 'sourcemap'
}