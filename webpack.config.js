var webpack=require('webpack');
var path=require('path');

var BUILD_DIR=path.resolve(__dirname,'build');
var APP_DIR=path.resolve(__dirname,'src');

var config={
  entry:['webpack-hot-middleware/client',APP_DIR+'/index.js'],
  start: "webpack-dev-server --hot",
  output:{
    path:BUILD_DIR,
    filename:'bundle.js',
    publicPath: '/build/'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ],
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loader: 'babel',
        exclude: /node_modules/,
        query: {
          cacheDirectory: true,
          presets: ['react', 'es2015']
        }
      },
      {
        test: /\.(jpg|png|svg)$/,
        loader: 'url-loader',
        options: {
          limit: 25000,
        },
      },
      {
        test:/\.css$/,
        use:['style-loader','css-loader']
      },
      {
        test: /\.(jpg|png|svg)$/,
        loader: 'file-loader',
        options: {
          name: '[path][name].[hash].[ext]',
        }
      }
    ]
  },
  devServer: {
    historyApiFallback: true,
  },
};
module.exports=config;
