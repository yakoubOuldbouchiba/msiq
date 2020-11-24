"use strict";

var _interopRequireWildcard = require("C:/Users/Yak/Desktop/MSIQ/msiq-v-1.0.0/node_modules/@babel/runtime/helpers/interopRequireWildcard");

var auth = _interopRequireWildcard(require("../../services/auth-service.js"));

var express = require("express");

var router = express.Router();

var dbOperationsDemandes = require('../../objects/demande_relex/dboperations.js');

module.exports = function (io) {
  //get a list of demandes
  router.get('/DemandesRelex', auth.requireLogin, function (req, res) {
    res.send({
      title: 'List of demandes'
    });
  }); // get a single demande

  router.get('/DemandeRelex/:id', auth.requireLogin, function (req, res) {
    dbOperationsDemandes.getDemandeRelex(req.params.id).then(function (result) {
      if (result.result === 'DG') {
        res.status(200).json({
          title: 'Votre demande relex is a get',
          demande: result.demande
        });
      } else if (result === 'CNGD') {
        res.status(401).json({
          title: 'Quelque chose s\'est mal passé. Veuillez verifier vos données',
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

  router.post('/DemandeRelex', auth.requireLogin, function (req, res) {
    dbOperationsDemandes.setDemandeRelex(req.body, io).then(function (result) {
      if (result === 'DI') {
        res.status(200).json({
          title: 'Votre demande activité relex a été envoyée'
        });
      } else if (result === 'CNID') {
        res.status(401).json({
          title: 'Quelque chose s\'est mal passé. Veuillez verifier vos données',
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

  router.delete('/DemandeRelex/:id/:struct', auth.requireLogin, function (req, res) {
    dbOperationsDemandes.deleteDemandeRelex(req.params.id).then(function (result) {
      if (result.result === 'DD') {
        io.emit("DeleteNofit" + result.recevoir_ID, req.params.id); //for notif CD

        if (result.typedelete) {
          io.emit(req.params.struct + "DRD");
        }

        res.status(200).json({
          title: 'Votre demande relex a été supprimée'
        });
      } else if (result === 'CNDD') {
        res.status(401).json({
          title: 'Quelque chose s\'est mal passé. Veuillez verifier vos données',
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

  router.post('/UpdateDemandeRelex', auth.requireLogin, function (req, res) {
    dbOperationsDemandes.editDemandeRelex(req.body, io).then(function (result) {
      if (result === 'DU') {
        res.status(200).json({
          title: 'Voter demande relex est mise à jours'
        });
      } else if (result === 'CNUD') {
        res.status(401).json({
          title: 'Quelque chose s\'est mal passé. Veuillez verifier vos données',
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