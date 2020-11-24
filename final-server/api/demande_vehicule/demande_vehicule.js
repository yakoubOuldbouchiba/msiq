"use strict";

var _interopRequireWildcard = require("C:/Users/Yak/Desktop/MSIQ/msiq-v-1.0.0/node_modules/@babel/runtime/helpers/interopRequireWildcard");

var auth = _interopRequireWildcard(require("../../services/auth-service.js"));

var express = require("express");

var router = express.Router();

var dbOperationsDemandes = require('../../objects/demande_vehicule/dboperations.js');

module.exports = function (io) {
  //get a single vehicule
  router.get('/DemandeVehicule/:id', auth.requireLogin, function (req, res) {
    dbOperationsDemandes.getDemandeVehicule(req.params.id).then(function (result) {
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

  router.post('/DemandeVehicule', auth.requireLogin, function (req, res) {
    console.log(req.body);
    dbOperationsDemandes.setDemandeVehicule(req.body, io).then(function (result) {
      if (result.result === 'DI') {
        res.status(200).json({
          title: 'Votre demande véhicule a été envoyée',
          demande_v_id: result.demande_v_id
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

  router.post('/UpdateDemandeVehicule', auth.requireLogin, function (req, res) {
    dbOperationsDemandes.editDemandeVehicule(req.body, io).then(function (result) {
      if (result === 'DU') {
        res.status(200).json({
          title: 'Voter demande véhicule a été mise à jours'
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
  }); // delete a demande

  router.delete('/DemandeVehicule/:id/:struct', auth.requireLogin, function (req, res) {
    dbOperationsDemandes.deleteDemandeVehicule(req.params.id).then(function (result) {
      if (result.result === 'DD') {
        io.emit("DeleteNofit" + result.recevoir_ID, req.params.id); //for notif CD

        if (result.typedelete) {
          io.emit(req.params.struct + "DVD");
        }

        res.status(200).json({
          title: 'Votre demande véhicule a été supprimée',
          demande_v_id: result.demande_v_id
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
  });
  return router;
};