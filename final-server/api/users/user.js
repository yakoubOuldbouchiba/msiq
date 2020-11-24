"use strict";

var _interopRequireWildcard = require("C:/Users/Yak/Desktop/MSIQ/msiq-v-1.0.0/node_modules/@babel/runtime/helpers/interopRequireWildcard");

var auth = _interopRequireWildcard(require("../../services/auth-service.js"));

var express = require("express");

var router = express.Router();

var dbOperationsClient = require('../../objects/users/dboperations.js');

module.exports = function (io) {
  //get a list of users
  router.get('/team', auth.requireLogin, function (req, res) {
    dbOperationsClient.getUsers().then(function (result) {
      res.send(result[0]);
    });
  }); //get a specific  user

  router.get('/users/:id', auth.requireLogin, function (req, res) {
    dbOperationsClient.getUser(req.params.id).then(function (result) {
      res.send(result);
    });
  }); //add a new user

  router.post('/register', function (req, res) {
    var user = req.body;
    dbOperationsClient.setUser(user).then(function (result) {
      if (result === 'UI') {
        res.status(200).json({
          title: 'Voter demande de compte a été envoyée'
        });
        io.emit('NewAccDemande' + req.body.structure, req.body);
      } else if (result === 'CNIU') {
        res.status(401).json({
          title: 'Email déja prit ou le compte est désactivé par votre directeu ou quelque information est incorrect. Veuillez verifier vous données',
          error: 'CNIU'
        });
      } else {
        res.status(401).json({
          title: 'Quelque chose s\'est mal passé dans le serveur',
          error: 'CNCTDB'
        });
      }
    });
  }); //login user

  router.post('/login', function (req, res) {
    var user = req.body;
    dbOperationsClient.Login(user).then(function (result) {
      res.json(result);
    });
  }); //update a user

  router.put('/users/:id', auth.requireLogin, function (req, res) {
    res.send({
      title: 'update a user'
    });
  }); // delete a user

  router.delete('/users/:id', auth.requireLogin, function (req, res) {
    dbOperationsClient.deleteUser(req.params.id).then(function (result, err) {
      if (err) return false;
      res.send(result);
      io.emit("DeleteCompte" + req.params.id);
    });
  }); // Confirm User

  router.post('/confirm', function (req, res) {
    dbOperationsClient.confirm(req.body).then(function (resu) {
      if (resu === 'G') res.status(200).json({
        title: 'Votre identité a été bien Confirmée'
      });else if (resu == 'WP') res.status(401).json({
        title: 'Mot de pass inccorect',
        error: 'WP'
      });else res.status(401).json({
        title: 'Quel que chose est mal passée coté serveur',
        error: 'CNCTDB'
      });
    });
  }); //changement de mot de pass

  router.post('/changeMDP', function (req, res) {
    dbOperationsClient.changePW(req.body).then(function (resu) {
      if (resu === 'G') res.status(200).json({
        title: 'Votre mot de passe ont été changé'
      });else res.status(401).json({
        title: 'Quel que chose est mal passée coté serveur',
        error: 'CNCTDB'
      });
    });
  }); //Modifier un utilisateur

  router.post('/updateuser', function (req, res) {
    dbOperationsClient.editUser(req.body).then(function (resu) {
      if (resu === 'UU') res.status(200).json({
        title: 'Votre informations ont été changé'
      });else res.status(401).json({
        title: 'Quel que chose est mal passée coté serveur',
        error: 'CNCTDB'
      });
    });
  });
  router.put('/AccDemande/:email', function (req, res) {
    dbOperationsClient.TAccDemande(req.params.email, req.body.msg).then(function (resu) {
      console.log(resu);
      if (resu === 'Accept') res.status(200).json({
        title: 'Demande de compte a ete accepté'
      });else if (resu === 'Reject') {
        console.log(req.params.email);
        io.emit("DeleteCompte" + req.params.email);
        res.status(200).json({
          title: 'Demande de compte a ete rejeté'
        });
      } else res.status(401).json({
        title: 'Quel que chose est mal passée coté serveur',
        error: 'CNCTDB'
      });
    });
  });
  return router;
};