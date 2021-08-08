const path = require('path')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  entry: './src/index.js',
  mode: 'development',
  output: {
    path: path.resolve('dist'),
    filename: 'bundle.js'
  },
  devtool: 'inline-source-map',
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      }
    ]
  },
  plugins: [
    // 在构建之前将 dist 目录清除
    new CleanWebpackPlugin({
      cleanOnceBeforeBuildPatterns: './dist'
    }),
    // 指定 HTML 模板，插件会将构建好的 js 文件自动插入到 HTML 文件中
    new HtmlWebpackPlugin({
      template: './src/index.html'
    })
  ],
  devServer: {
    // 指定开发环境运行的根目录
    contentBase: path.join(__dirname, 'dist'),
    // 指定控制台输出信息
    stats: {
      errors: true
    },
    // 不启动压缩
    compress: false,
    host: 'localhost',
    port: '8090'
  }
}