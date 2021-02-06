const { resolve } = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin')

// process.env.NODE_ENV = 'development'
process.env.NODE_ENV = 'production'
module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'index.js',
    path: resolve(__dirname, 'dist')
  },
  module: {
    rules: [
      {
        test: /\.less$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: '../'
            }
          },
          'css-loader',
          'less-loader',
          {
            loader: 'postcss-loader',
            options:{
              postcssOptions:{
                plugins: () => {
                  'postcss-preset-env'
                }
              }
            }
          }
        ]
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: '../',
              esModule: false
            }
          },
          'css-loader',
          {
            loader: 'postcss-loader',
            options:{
              postcssOptions:{
                plugins: () => {
                  'postcss-preset-env'
                }
              }
            }
          }
        ],
      },
      {
        test: /\.html$/,
        loader: 'html-loader',
      },
      {
        test: /\.(jpg|png|gif)$/,
        loader: 'url-loader',
        options: {
          outputPath: 'imgs',
          limit: 12*1024,
          name: '[hash:10].[ext]'
        }
      },
      {
        exclude: /\.(jpg|png|gif|js|json|html|css|less)$/,
        loader: 'file-loader',
        options: {
          outputPath: 'others',
          limit: 12*1024,
          name: '[hash:10].[ext]'
        }
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'eslint-loader',
        options: {
          fix: true
        }
      }
    ]
  },
  plugins: [
    // html模板
    new HtmlWebpackPlugin({
      template: './src/index.html'
    }),
    // css样式提取
    new MiniCssExtractPlugin({
      filename: 'css/index.css',
    }),
    // 压缩css文件
    new OptimizeCssAssetsWebpackPlugin()
  ],
  mode: 'development',
  devServer: {
    contentBase: resolve(__dirname, 'dist'),
    compress: true,
    open: true,
    port: 80,
    host: '192.168.10.32'
  }

}