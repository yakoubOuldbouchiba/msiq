'use strict';

var express = require("express");
var router = express.Router();
var jwt = require('jsonwebtoken');

module.exports = function (users) {
    router.get('/', function (req, res) {
        res.send("hello");
    });
    router.post('/', function (req, res) {
        var loginData = req.body;
        var dataUser = {};
        console.log(loginData);
        var userID = users.findIndex(function (user) {
            return user.userName == loginData.userName;
        });
        if (userID != '-1' && users[userID].password == loginData.password && users[userID].role == loginData.role) {
            dataUser.token = jwt.sign(userID, '123');
            dataUser.userName = users[userID].userName;
            dataUser.role = users[userID].role;
            dataUser.avatar = users[userID].avatar;
            /*token=jwt.sign(userID,'123');*/
            res.json(dataUser);
        }
    });
    return router;
};