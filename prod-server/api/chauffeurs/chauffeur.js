var express = require("express");

var router = express.Router();

var jwt = require('jsonwebtoken');

var dboperationChauffeur = require('../../objects/chauffeurs/dboperations');

module.exports = function () {
  //get a list of chauffeurs
  router.get('/chauffeurs', function (req, res) {
    dboperationChauffeur.getChauffeurs().then(function (result) {
      res.json(result[0]);
    });
  }); //add a new chauffeur

  router.post('/chauffeur', function (req, res) {
    dboperationChauffeur.setChauffeur(req.body).then(function (result) {
      res.json(result);
    });
  }); //update a chauffeur

  router.put('/chauffeur/:id', function (req, res) {
    res.send({
      title: 'update a chauffeur'
    });
  }); // delete a chauffeur

  router.delete('/chauffeur/:id', function (req, res) {
    dboperationChauffeur.deleteChauffeur(req.params.id).then(function (result) {
      res.json(result);
    });
  });
  return router;
};