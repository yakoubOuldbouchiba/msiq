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
        target : 'http://192.168.43.39:3030'
      }
    }
  }
}


