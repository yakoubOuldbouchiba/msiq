"use strict";

var _interopRequireWildcard = require("C:/Users/Yak/Desktop/MSIQ/msiq-v-1.0.0/node_modules/@babel/runtime/helpers/interopRequireWildcard");

var auth = _interopRequireWildcard(require("../../services/auth-service.js"));

var express = require("express");

var router = express.Router();

var dbOperationsDemandePriseEnCharge = require('../../objects/DemandePriseEnCharge/dboperations');

var jwt = require('jsonwebtoken');

module.exports = function (io) {
  //add a new demande
  router.post('/DemandePriseEnCharge', function (req, res) {
    dbOperationsDemandePriseEnCharge.setDemandePriseEnCharge(req.body, io).then(function (result) {
      if (result === 'DI') {
        res.status(200).json({
          title: 'Voter demande Prise en charge a été envoyée'
        });
      } else if (result === 'CNID') {
        res.status(401).json({
          title: 'Quelque chose s\'est mal passé. Veuillez verifier vous données',
          error: 'CNID'
        });
      } else {
        res.status(401).json({
          title: 'Quelque chose s\'est mal passé dans le serveur',
          error: 'CNCTDB'
        });
      }
    });
  }); // delete a demande

  router.delete('/DemandePriseEnCharge/:id/:struct', auth.requireLogin, function (req, res) {
    dbOperationsDemandePriseEnCharge.deleteDemandePriseEnCharge(req.params.id).then(function (result) {
      if (result.result === 'DD') {
        io.emit("DeleteNofit" + result.recevoir_ID, req.params.id); //for notif CD

        if (result.typedelete) {
          io.emit(req.params.struct + "DPD");
        }

        res.status(200).json({
          title: 'Votre demande prise en charge a été supprimée'
        });
      } else if (result === 'CNDD') {
        res.status(401).json({
          title: 'Quelque chose s\'est mal passé. Veuillez verifier vous données',
          error: 'CNIU'
        });
      } else {
        res.status(401).json({
          title: 'Quelque chose s\'est mal passé dans le serveur',
          error: 'CNCTDB'
        });
      }
    });
  }); // Get a demand

  router.get('/DemandePriseEnCharge/:id', auth.requireLogin, function (req, res) {
    dbOperationsDemandePriseEnCharge.GetDemandePriseEnCharge(req.params.id).then(function (result) {
      if (!!result) {
        res.status(200).json({
          title: 'Votre demande prise en charge a été chargée',
          demande: result
        });
      } else {
        res.status(401).json({
          title: 'Quelque chose s\'est mal passé dans le serveur',
          demande: null,
          error: 'CNCTDB'
        });
      }
    });
  }); //Edit the demand

  router.post('/UpdateDemandePriseEnCharge', auth.requireLogin, function (req, res) {
    dbOperationsDemandePriseEnCharge.UpdateDemandePriseEnCharge(req.body, io).then(function (result) {
      if (result == 'DE') {
        res.status(200).json({
          title: 'Votre demande prise en charge a été modifier',
          demande: result
        });
      } else {
        res.status(401).json({
          title: 'Quelque chose s\'est mal passé dans le serveur',
          demande: null,
          error: 'CNCTDB'
        });
      }
    });
  });
  return router;
};