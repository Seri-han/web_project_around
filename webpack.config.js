module.exports = {
    entry: "./src/index.js",  // Ruta de entrada a tu archivo JS
    output: {
      filename: "bundle.js",  // Salida del archivo JS
      path: path.resolve(__dirname, "dist"),  // Ruta de salida
    },
    mode: "development",
    devServer: {
      static: path.join(__dirname, "dist"),
      open: true,
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: "babel-loader",  // Para procesar JS
        },
        {
          test: /\.css$/,
          use: ["style-loader", "css-loader"],  // Para procesar CSS
        },
        {
          test: /\.html$/,
          use: "html-loader",  // Para procesar HTML
        },
        {
          test: /\.(png|jpg|jpeg|gif|svg)$/,  // Para procesar imágenes
          use: [
            {
              loader: "file-loader",
              options: {
                name: "[name].[ext]",  // Mantener el nombre original del archivo
                outputPath: "assets/images/",  // Coloca las imágenes en la carpeta 'assets/images' dentro de 'dist'
              },
            },
          ],
        },
      ],
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: "./src/index.html",  // Usar el archivo HTML como plantilla
      }),
    ],
  };
  