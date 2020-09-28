'use strict';

var _require = require('dgram'),
    Socket = _require.Socket;

var express = require('express');

var _require2 = require('./config/env.js'),
    setEnvironement = _require2.setEnvironement;

var app = express();
var port = 3030;
var route = require('./route.js');

/** websocket setups */
var http = require('http').Server(app);
var io = require('socket.io')(http);

setEnvironement(app);

app.use(route(io));

app.get('/', function (rep, res) {
  if (process.env.NODE_ENV !== 'production ') {
    return res.send("the server is running in developement mode.");
  } else {
    return res.sendFile('index.html', { root: __dirname + '/../dist/' });
  }
});

http.listen(port, function () {
  console.log('Msiq app listening at http://localhost:' + port + ' and in ' + process.env.NODE_ENV + ' mode');
});