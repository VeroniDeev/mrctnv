/** @type {import('next').NextConfig} */
const path = require("path")

const nextConfig = {
    sassOptions: {
        includePaths: [path.join(__dirname, 'src/styles')],
      },
      webpack(config) {
        config.module.rules.push({
          test: /\.(woff|woff2|eot|ttf|otf)$/,
          use: {
            loader: 'url-loader',
          },
        });
    
        return config;
      },}

module.exports = nextConfig

