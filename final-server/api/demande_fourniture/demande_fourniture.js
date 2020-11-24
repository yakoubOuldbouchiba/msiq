"use strict";

var _interopRequireWildcard = require("C:/Users/Yak/Desktop/MSIQ/msiq-v-1.0.0/node_modules/@babel/runtime/helpers/interopRequireWildcard");

var auth = _interopRequireWildcard(require("../../services/auth-service.js"));

var express = require("express");

var router = express.Router();

var dbOperationsDemandes = require('../../objects/demande_fourniture/dboperations.js');

module.exports = function (io) {
  // get a single demande
  router.get('/DemandeFourniture/:id', auth.requireLogin, function (req, res) {
    dbOperationsDemandes.getDemandeFourniture(req.params.id).then(function (result) {
      if (result.result === 'DG') {
        res.status(200).json({
          title: 'Votre demande client a get',
          demande: result.demande
        });
      } else if (result === 'CNGD') {
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
  }); //add a new demande

  router.post('/DemandeFourniture', auth.requireLogin, function (req, res) {
    dbOperationsDemandes.setDemandeFourniture(req.body, io).then(function (result) {
      if (result === 'DI') {
        res.status(200).json({
          title: 'Votre demande fourniture a été envoyée'
        });
      } else if (result === 'CNID') {
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
  }); //update a demande

  router.put('/DemandeFourniture/:id', auth.requireLogin, function (req, res) {
    res.send({
      method: 'update a demande'
    });
  }); // delete a demande

  router.delete('/DemandeFourniture/:id/:struct', auth.requireLogin, function (req, res) {
    dbOperationsDemandes.deleteDemandeFourniture(req.params.id).then(function (result) {
      if (result.result === 'DD') {
        io.emit("DeleteNofit" + result.recevoir_ID, req.params.id); //for notif CD

        if (result.typedelete) {
          io.emit(req.params.struct + "DFD"); //notif for reporting.
        }

        res.status(200).json({
          title: 'Votre demande fourniture a été supprimée'
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
  }); //update a  demande

  router.post('/UpdateDemandeFourniture', auth.requireLogin, function (req, res) {
    dbOperationsDemandes.editDemandeFourniture(req.body, io).then(function (result) {
      if (result === 'DU') {
        res.status(200).json({
          title: 'Voter demande client a été mise à jours'
        });
      } else if (result === 'CNUD') {
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
  });
  return router;
};