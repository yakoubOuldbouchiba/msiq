const path = require('path');
module.exports = {
  publicPath: process.env.NODE_ENV === 'production '
    ? ''
    : '/',
  "transpileDependencies": [
    "vuetify"
  ],
  devServer :{
    proxy :{
      '/api':{
        target : 'http://localhost:3030'
      }
    }
  }
}


