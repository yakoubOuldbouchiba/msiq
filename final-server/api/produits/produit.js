"use strict";

var _interopRequireWildcard = require("C:/Users/Yak/Desktop/MSIQ/msiq-v-1.0.0/node_modules/@babel/runtime/helpers/interopRequireWildcard");

var auth = _interopRequireWildcard(require("../../services/auth-service.js"));

var express = require("express");

var router = express.Router();

var dboperationsProduit = require('../../objects/produits/dboperations');

module.exports = function () {
  //get a list of produits
  router.get('/produits', auth.requireLogin, function (req, res) {
    dboperationsProduit.getProduits().then(function (result) {
      res.json(result[0]);
    });
  }); //add a produit

  router.post('/produit', auth.requireLogin, function (req, res) {
    dboperationsProduit.setProduit(req.body).then(function (result) {
      res.json(result);
    });
  }); //update a produit

  router.put('/produit/:id', auth.requireLogin, function (req, res) {
    res.send({
      title: 'update a user'
    });
  }); // delete a produit

  router.delete('/produit/:id', auth.requireLogin, function (req, res) {
    dboperationsProduit.deleteProduit(req.params.id).then(function (result) {
      res.json(result);
    });
  });
  return router;
};