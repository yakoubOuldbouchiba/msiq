
const express  = require('express');
const { setEnvironement } = require('./config/env.js');
const app = express()
const port = 3030
const hostname = '192.168.43.39' 
const route = require('./route.js');

/** websocket setups */
const http = require('http').Server(app);
var io = require('socket.io')(http)

setEnvironement(app);

app.use(route(io));
app.use(express.static('FilesTirage'))
app.use(express.static(__dirname+'/../dist/'))

app.get('*',(rep,res)=>{
  if(process.env.NODE_ENV!=='production '){
    return res.send("the server is running in developement mode.")
  }else{
    return res.sendFile('index.html',{root:__dirname+'/../dist/'})
  }
})

http.listen(port, hostname , () => {
  console.log(`Msiq app listening at ${hostname}  ${port}`+ ' and in '+process.env.NODE_ENV+' mode')
})


