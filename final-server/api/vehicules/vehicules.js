"use strict";

var _interopRequireWildcard = require("C:/Users/Yak/Desktop/MSIQ/msiq-v-1.0.0/node_modules/@babel/runtime/helpers/interopRequireWildcard");

var auth = _interopRequireWildcard(require("../../services/auth-service.js"));

var express = require("express");

var router = express.Router();

var dbOperationsVehicule = require('../../objects/vehicules/dboperations');

module.exports = function (users) {
  //get a list of vehicules
  router.get('/vehicules', auth.requireLogin, function (req, res) {
    dbOperationsVehicule.getVehicules().then(function (result) {
      res.json(result[0]);
    });
  }); //get a list of vehicules

  router.get('/dispovehicules/:date', auth.requireLogin, function (req, res) {
    dbOperationsVehicule.getVehicules(req.params.date).then(function (result) {
      res.json(result[0]);
    });
  }); //get a specific  vehicule

  router.get('/vehicule/:id', auth.requireLogin, function (req, res) {
    dbOperationsVehicule.getVehicule(req.params.id).then(function (result) {
      res.send(result[0]);
    });
  }); //add a new vehicule

  router.post('/vehicule', auth.requireLogin, function (req, res) {
    dbOperationsVehicule.setVehicule(req.body).then(function (result) {
      res.json(result);
    });
  }); //update a vehicule

  router.put('/vehicule/:id', auth.requireLogin, function (req, res) {
    dbOperationsVehicule.editVehicule(req.body).then(function (result) {
      res.json(result);
    });
  }); // delete a vehicule

  router.delete('/vehicule/:id', auth.requireLogin, function (req, res) {
    dbOperationsVehicule.deleteVehicule(req.params.id).then(function (result) {
      res.json(result);
    });
  });
  return router;
};