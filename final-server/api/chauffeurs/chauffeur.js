"use strict";

var _interopRequireWildcard = require("C:/Users/Yak/Desktop/MSIQ/msiq-v-1.0.0/node_modules/@babel/runtime/helpers/interopRequireWildcard");

var auth = _interopRequireWildcard(require("../../services/auth-service.js"));

var express = require("express");

var router = express.Router();

var dboperationChauffeur = require('../../objects/chauffeurs/dboperations');

module.exports = function () {
  //get a list of chauffeurs
  router.get('/chauffeurs', auth.requireLogin, function (req, res) {
    dboperationChauffeur.getChauffeurs().then(function (result) {
      res.json(result[0]);
    });
  }); //get a list of chauffeurs

  router.get('/dispochauffeurs/:date', auth.requireLogin, function (req, res) {
    dboperationChauffeur.getDispoChauffeurs(req.params.date).then(function (result) {
      res.json(result[0]);
    });
  }); //add a new chauffeur

  router.post('/chauffeur', auth.requireLogin, function (req, res) {
    dboperationChauffeur.setChauffeur(req.body).then(function (result) {
      res.json(result);
    });
  }); //update a chauffeur

  router.put('/chauffeur/:id', auth.requireLogin, function (req, res) {
    dboperationChauffeur.editChauffeur(req.params.id, req.body).then(function (result) {
      res.json(result);
    });
  }); // delete a chauffeur

  router.delete('/chauffeur/:id', auth.requireLogin, function (req, res) {
    dboperationChauffeur.deleteChauffeur(req.params.id).then(function (result) {
      res.json(result);
    });
  });
  return router;
};