'use strict';

var express = require("express");
var router = express.Router();
var jwt = require('jsonwebtoken');

module.exports = function () {
    //get a list of chauffeurs
    router.get('/chauffeurs', function (req, res) {
        res.send({ title: 'liste chauffeurs' });
    });
    //add a new chauffeur
    router.post('/chauffeur', function (req, res) {
        res.send({ title: 'new added' });
    });
    //update a chauffeur
    router.put('/chauffeur/:id', function (req, res) {
        res.send({ title: 'update a chauffeur' });
    });
    // delete a chauffeur
    router.delete('/chauffeur/:id', function (req, res) {
        res.send({ title: 'delete' });
    });
    return router;
};