const path = require('path')
module.exports = {
  outputDir: path.resolve(__dirname, '../server/vue'),
  devServer: {
    proxy: 'http://localhost:3000'
  }
}
