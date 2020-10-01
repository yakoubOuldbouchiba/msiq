var express = require("express");

var router = express.Router();

var jwt = require('jsonwebtoken');

module.exports = function () {
  //get a list of demandes
  router.get('/demandes', function (req, res) {
    res.send({
      title: 'List of demandes'
    });
  }); //add a new demande

  router.post('/demande', function (req, res) {
    res.json({
      title: 'add demande'
    });
  }); //update a demande

  router.put('/demande/:id', function (req, res) {
    res.send({
      method: 'update a demande'
    });
  }); // delete a demande

  router.delete('/demande/:id', function (req, res) {
    res.send({
      method: 'delete a demande'
    });
  });
  return router;
};