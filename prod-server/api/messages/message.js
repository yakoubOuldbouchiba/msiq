'use strict';

var express = require("express");
var jwt = require('jsonwebtoken');
var router = express.Router();

module.exports = function (messages, users, io) {
    router.get('/', function (req, res) {
        res.send(messages);
    });

    router.post('/', function (req, res) {
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
    });

    return router;
};