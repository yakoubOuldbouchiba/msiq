"use strict";

var _interopRequireWildcard = require("C:/Users/Yak/Desktop/MSIQ/msiq-v-1.0.0/node_modules/@babel/runtime/helpers/interopRequireWildcard");

var auth = _interopRequireWildcard(require("../../services/auth-service.js"));

var express = require("express");

var router = express.Router();

var dbOperationsNotifications = require('../../objects/notifications/dboperations.js');

module.exports = function (io) {
  // get all notification
  router.get('/Notification/:email', auth.requireLogin, function (req, res) {
    dbOperationsNotifications.getNotifactions(req.params.email).then(function (result) {
      if (result.result === 'NG') {
        res.status(200).json({
          title: 'notifications get',
          notifications: result.notifications
        });
      } else if (result === 'CNGN') {
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
  }); // get unseen notification

  router.get('/UnSeenNotification/:email', auth.requireLogin, function (req, res) {
    dbOperationsNotifications.UnSeeNotifactions(req.params.email).then(function (result) {
      if (result.result === 'SN') {
        res.status(200).json({
          title: 'un seen notifications get',
          UnSeenNotif: result.UnSeenNotif[0].unseen
        });
      } else if (result === 'CNSN') {
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
  }); // seen notification

  router.put('/Notification/:id/:email', auth.requireLogin, function (req, res) {
    dbOperationsNotifications.SeeNotifactions(req.params.id).then(function (result) {
      if (result.result === 'SN') {
        io.emit('seen' + req.params.email, req.params.id);
        res.status(200).json({
          title: 'notification seen'
        });
      } else if (result === 'CNSN') {
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