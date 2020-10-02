var express = require("express");

var router = express.Router();

var jwt = require('jsonwebtoken');

var dboperationsFournitures = require('../../objects/fournitures/dboperations');

module.exports = function () {
  //get a list of fournitures
  router.get('/fournitures', function (req, res) {
    dboperationsFournitures.getObjects().then(function (result) {
      res.json(result[0]);
    });
  }); //add a new fourniture

  router.post('/fourniture', function (req, res) {
    console.log(req.body);
    dboperationsFournitures.setObject(req.body).then(function (result) {
      res.json(result);
    });
  }); //update a fourniture

  router.put('/fourniture/:id', function (req, res) {
    res.send({
      title: 'update a fourniture'
    });
  }); // delete a user

  router.delete('/fourniture/:id', function (req, res) {
    dboperationsFournitures.deleteObject(req.params.id).then(function (result) {
      res.json(result);
    });
  });
  return router;
};