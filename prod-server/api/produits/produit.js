var express = require("express");

var router = express.Router();

var jwt = require('jsonwebtoken');

module.exports = function () {
  //get a list of produits
  router.get('/produits', function (req, res) {
    res.send({
      title: 'List of produits'
    });
  }); //add a produit

  router.post('/produit', function (req, res) {
    res.json({
      title: 'add a produit'
    });
  }); //update a produit

  router.put('/produit/:id', function (req, res) {
    res.send({
      title: 'update a user'
    });
  }); // delete a produit

  router.delete('/produit/:id', function (req, res) {
    res.send({
      method: 'delete'
    });
  });
  return router;
};