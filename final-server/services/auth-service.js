"use strict";

var _interopRequireDefault = require("C:/Users/Yak/Desktop/MSIQ/msiq-v-1.0.0/node_modules/@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.generateJWT = generateJWT;
exports.requireLogin = requireLogin;
exports.decodeToken = decodeToken;

var _bodyParser = require("body-parser");

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

function generateJWT(user) {
  var tokenData = {
    email: user.email,
    nomUtilisateur: user.nomUtilisateur,
    prenomUtilisateur: user.prenomUtilisateur,
    fonction: user.fonction,
    typeUtilisateur: user.typeUtilisateur,
    structure: user.structure,
    dateNaissance: user.dateNaissance,
    mobile: user.mobile,
    posteTelephonique: user.posteTelephonique,
    departement: user.departement
  };
  return _jsonwebtoken.default.sign({
    user: tokenData
  }, 'TMPK3Y');
} //this checking the user is loging before enter any router


function requireLogin(req, res, next) {
  var token = decodeToken(req); //only is not enough we should test id with type user. 

  if (!token) {
    res.status(401).json({
      message: "we have to be login"
    });
  }

  next();
} //verifier if we have a right token


function decodeToken(req) {
  //const token = req.headers('Authorization')
  var token = req.headers.authorization || req.headers['Authorization'];

  if (!token) {
    return null;
  }

  try {
    return _jsonwebtoken.default.verify(token, 'TMPK3Y');
  } catch (error) {
    return null;
  }
}