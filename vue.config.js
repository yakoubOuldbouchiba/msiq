module.exports = {
  "transpileDependencies": [
    "vuetify"
  ]
}
const path = require('path');
module.exports = {
  devServer :{
    proxy :{
      '/api':{
        target : 'http://localhost:3030'
      }
    }
  }
};