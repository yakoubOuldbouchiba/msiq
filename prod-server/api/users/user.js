var express = require("express");

var router = express.Router();

var jwt = require('jsonwebtoken');

var dbOperationsClient = require('../../objects/users/dboperations.js');

module.exports = function () {
  //get a list of users
  router.get('/team', function (req, res) {
    dbOperationsClient.getUsers().then(function (result) {
      res.send(result[0]);
    });
  }); //get a specific  user

  router.get('/users/:id', function (req, res) {
    dbOperationsClient.getUser(req.params.id).then(function (result) {
      res.send(result[0]);
    });
  }); //add a new user

  router.post('/register', function (req, res) {
    var user = req.body;
    var result = dbOperationsClient.setUser(user);
    console.log(result);

    if (result) {
      token = jwt.sign(user, '123');
      res.json(token);
    }
  }); //login user

  router.post('/login', function (req, res) {
    var user = req.body;
    dbOperationsClient.Login(user).then(function (result) {
      console.log(result);
      res.json(result);
    });
  }); //update a user

  router.put('/users/:id', function (req, res) {
    res.send({
      title: 'update a user'
    });
  }); // delete a user

  router.delete('/users/:id', function (req, res) {
    dbOperationsClient.deleteUser(req.params.id).then(function (result) {
      res.send(result);
    });
  });
  return router;
};