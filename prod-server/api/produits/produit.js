var express = require("express");

var router = express.Router();

var jwt = require('jsonwebtoken');

var dboperationsProduit = require('../../objects/produits/dboperations');

module.exports = function () {
  //get a list of produits
  router.get('/produits', function (req, res) {
    dboperationsProduit.getProduits().then(function (result) {
      res.json(result[0]);
    });
  }); //add a produit

  router.post('/produit', function (req, res) {
    dboperationsProduit.setProduit(req.body).then(function (result) {
      res.json(result);
    });
  }); //update a produit

  router.put('/produit/:id', function (req, res) {
    res.send({
      title: 'update a user'
    });
  }); // delete a produit

  router.delete('/produit/:id', function (req, res) {
    dboperationsProduit.deleteProduit(req.params.id).then(function (result) {
      res.json(result);
    });
  });
  return router;
};