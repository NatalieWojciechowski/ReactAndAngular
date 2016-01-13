module.exports = {
  entry: './src/assets/scripts/app/_app.js',
  output: {
    path: './src/assets/scripts/react/',
    publicPath: 'http://localhost:3333/react/',
    filename: 'compiled_react_app.js'
  },
  devServer: {
    inline: true,
    port: 3333
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel',
        query: {
          presets: ['es2015', 'react']
        }
      }
    ]
  }
}
