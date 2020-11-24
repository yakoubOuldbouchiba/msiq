var _classCallCheck = require("C:/Users/Yak/Desktop/MSIQ/msiq-v-1.0.0/node_modules/@babel/runtime/helpers/classCallCheck");

var User = function User(userName, userPassword, nomClient, prenomClient, dateNaissance, mobile, email, fonction, structure, departement) {
  "use strict";

  _classCallCheck(this, User);

  this.userName = userName;
  this.userPassword = userPassword;
  this.nomClient = nomClient;
  this.prenomClient = prenomClient;
  this.dateNaissance = dateNaissance;
  this.mobile = mobile;
  this.email = email;
  this.fonction = fonction;
  this.structure = structure;
  this.departement = departement;
};

module.exports = User;