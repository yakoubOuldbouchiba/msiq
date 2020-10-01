var express = require("express");

var router = express.Router();

var jwt = require('jsonwebtoken');

module.exports = function (users) {
  //get a list of vehicules
  router.get('/team', function (req, res) {
    res.send({
      title: 'List of vehicules'
    });
  }); //add a new vehicule

  router.post('/vehicule', function (req, res) {
    res.send({
      title: 'add a vehicule'
    });
  }); //update a vehicule

  router.put('/vehicule/:id', function (req, res) {
    res.send({
      method: 'update a vehicule'
    });
  }); // delete a vehicule

  router.delete('/vehicule/:id', function (req, res) {
    res.send({
      method: 'delete a vehicule'
    });
  });
  return router;
};