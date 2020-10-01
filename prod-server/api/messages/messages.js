var express = require("express");

var jwt = require('jsonwebtoken');

var router = express.Router();

module.exports = function (messages, users, io) {
  //send list messages
  router.get('/messages', function (req, res) {
    res.send(messages);
  }); //add new message

  router.post('/messages', function (req, res) {
    var msg = {};
    msg = req.body;
    var token = req.header('Authorization');
    var id = jwt.decode(token, '123');
    msg.sender_ID = id;
    msg.userName = users[msg.reciever_ID].userName;
    msg.avatar = users[msg.reciever_ID].avatar;
    messages.push(msg);
    io.emit('message', req.body);
    res.sendStatus(200);
  }); // update a message

  router.put('/message/:id', function (req, res) {
    res.send({
      title: 'new a message'
    });
  }); // delete a message

  router.delete('message/:id', function (req, res) {
    res.send({
      title: 'delete a message'
    });
  });
  return router;
};