'use strict';

var express = require("express");
var router = express.Router();
var jwt = require('jsonwebtoken');

module.exports = function (users) {
    router.post('/', function (req, res) {
        var user = req.body;
        var index = users.push(user);
        var userId = index - 1;
        var token = void 0;
        token = jwt.sign(userId, '123');
        res.json(token);
    });
    return router;
};