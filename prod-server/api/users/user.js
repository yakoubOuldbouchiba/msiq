'use strict';

var express = require("express");
var router = express.Router();
var jwt = require('jsonwebtoken');

module.exports = function (users) {
    //get a list of users
    router.get('/team', function (req, res) {
        res.send(users);
    });
    //add a new user
    router.post('/register', function (req, res) {
        var user = req.body;
        var index = users.push(user);
        var userId = index - 1;
        var token = void 0;
        token = jwt.sign(userId, '123');
        res.json(token);
    });
    //login user
    router.post('/login', function (req, res) {
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
            res.json(dataUser);
        }
    });
    //update a user
    router.put('/:id', function (req, res) {
        res.send({ title: 'update a user' });
    });
    // delete a user
    router.delete('/:id', function (req, res) {
        res.send({ method: 'delete a user' });
    });
    return router;
};