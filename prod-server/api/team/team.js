"use strict";

var express = require("express");
var router = express.Router();

module.exports = function (users) {
    router.get('/', function (req, res) {
        res.send(users);
    });
    return router;
};