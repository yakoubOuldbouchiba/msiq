"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setEnvironement = setEnvironement;

var express = require('express');

var morgan = require('morgan');

var cors = require('cors');

var bodyParser = require('body-parser');

function setEnvironement(app) {
  if (process.env.NODE_ENV !== 'production ') {
    setDevEnv(app);
  } else {
    console.log(process.env.NODE_ENV);
    setProdEnv(app);
  }
}

function setDevEnv(app) {
  process.env.NODE_ENV = "developement";
  console.log("setting developement env");
  app.use(bodyParser.urlencoded({
    extended: true
  }));
  app.use(bodyParser.json());
  app.use(morgan());
  app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    res.header("Access-Control-Allow-Credentials", true);
    res.header("Access-Control-Allow-Methods", "POST,GET,OPTIONS");
    next();
  });
  app.use(cors());
}

function setProdEnv(app) {
  console.log("setting production env");
  app.use(bodyParser.json());
  app.use(express.static(__dirname + '/../dist'));
}