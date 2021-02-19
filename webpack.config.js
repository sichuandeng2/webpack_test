const { resolve } = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin')

// 声明运行模式：development | production
const runMode = 'production'

// 定Css样式loader
const commentCssLoader = [
  {
    loader: MiniCssExtractPlugin.loader,
    options: {
      publicPath: '../'
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
  },
]
// 绑定node.js 的运行环境
process.env.NODE_ENV = runMode
// webpack的配置
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
          ...commentCssLoader,
          'less-loader',
        ]
      },
      {
        test: /\.css$/,
        use: [...commentCssLoader]
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
          name: '[hash:10].[ext]',
          esModule: false
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
        enforce: 'pre',
        loader: 'eslint-loader',
        options: {
          fix: true
        }
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          presets: [
            // '@babel/preset-env'
            [
              '@babel/preset-env',
              {
                useBuiltIns:'usage',
                // useBuiltIns:'entry',
                corejs: {
                  version: 3
                },
                targets: {
                  chrome: '60',
                  firefox: '60',
                  ie: '9',
                  safari: '10',
                  edge: '17'
                }
              }
            ]
          ]
        }
      }
    ]
  },
  plugins: [
    // html模板
    new HtmlWebpackPlugin({
      template: './src/index.html',
      // minify: {
      //   collapseWhitespace: true,
      //   removeComments: true
      // }
    }),
    // css样式提取
    new MiniCssExtractPlugin({
      filename: 'css/index.css',
    }),
    // 压缩css文件
    // new OptimizeCssAssetsWebpackPlugin()
  ],
  mode: runMode,
  devServer: {
    contentBase: resolve(__dirname, 'dist'),
    compress: true,
    open: true,
    port: 8080,
    host: '192.168.10.32',
    disableHostCheck: true
  }

}