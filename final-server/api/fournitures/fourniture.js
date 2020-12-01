"use strict";

var _interopRequireWildcard = require("C:/Users/Yak/Desktop/MSIQ/msiq-v-1.0.0/node_modules/@babel/runtime/helpers/interopRequireWildcard");

var _jquery = require("jquery");

var auth = _interopRequireWildcard(require("../../services/auth-service.js"));

var express = require("express");

var router = express.Router();

var dboperationsFournitures = require('../../objects/fournitures/dboperations');

module.exports = function () {
  //get a list of fournitures
  router.get('/fournitures', auth.requireLogin, function (req, res) {
    dboperationsFournitures.getObjects().then(function (result) {
      console.log(result);
      res.json(result);
    });
  }); //add a new fourniture

  router.post('/fourniture', auth.requireLogin, function (req, res) {
    console.log(req.body);
    dboperationsFournitures.setObject(req.body).then(function (result) {
      res.json(result);
    });
  }); //update a fourniture

  router.put('/fourniture/:id', auth.requireLogin, function (req, res) {
    dboperationsFournitures.editObject(req.body).then(function (result, error) {
      res.json(result);
    });
  }); // delete a user

  router.delete('/fourniture/:id', auth.requireLogin, function (req, res) {
    dboperationsFournitures.deleteObject(req.params.id).then(function (result) {
      res.status(200).json(result);
    });
  });
  return router;
};