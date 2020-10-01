var express = require("express");

var router = express.Router();

var jwt = require('jsonwebtoken');

module.exports = function () {
  //get a list of fournitures
  router.get('/fournitures', function (req, res) {
    res.send({
      title: 'List fournitures'
    });
  }); //add a new fourniture

  router.post('/fourniture', function (req, res) {
    res.json({
      title: 'fourniture added'
    });
  }); //update a fourniture

  router.put('/fourniture/:id', function (req, res) {
    res.send({
      title: 'update a fourniture'
    });
  }); // delete a user

  router.delete('/fourniture/:id', function (req, res) {
    res.send({
      method: 'delete a user'
    });
  });
  return router;
};