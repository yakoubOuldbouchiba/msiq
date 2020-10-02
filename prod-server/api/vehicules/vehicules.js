var express = require("express");

var router = express.Router();

var jwt = require('jsonwebtoken');

var dbOperationsVehicule = require('../../objects/vehicules/dboperations');

module.exports = function (users) {
  //get a list of vehicules
  router.get('/vehicules', function (req, res) {
    dbOperationsVehicule.getVehicules().then(function (result) {
      res.json(result[0]);
    });
  }); //get a specific  vehicule

  router.get('/vehicule/:id', function (req, res) {
    dbOperationsVehicule.getVehicule(req.params.id).then(function (result) {
      res.send(result[0]);
    });
  }); //add a new vehicule

  router.post('/vehicule', function (req, res) {
    dbOperationsVehicule.setVehicule(req.body).then(function (result) {
      res.json(result);
    });
  }); //update a vehicule

  router.put('/vehicule/:id', function (req, res) {}); // delete a vehicule

  router.delete('/vehicule/:id', function (req, res) {
    dbOperationsVehicule.deleteVehicule(req.params.id).then(function (result) {
      res.json(result);
    });
  });
  return router;
};