var express = require('express');

var chauffeurs = require('./api/chauffeurs/chauffeur.js');

var demandes = require('./api/demandes/demandes.js');

var fournitures = require('./api/fournitures/fourniture.js');

var messages = require('./api/messages/messages.js');

var produits = require('./api/produits/produit.js');

var users = require('./api/users/user');

var vehicules = require('./api/vehicules/vehicules.js');

var Messages = [{
  sender_ID: '0',
  reciever_ID: '1',
  content: 'bli blo bli blo bli',
  userName: 'Yakoub Ould bouchiba',
  avatar: '/avatar1.jpg'
}];
var Users = [{
  userName: 'Yakoub Ould bouchiba',
  role: 'Chef de parc',
  avatar: '/avatar1.jpg',
  password: '11'
}, {
  userName: 'Yacine Lalmi',
  role: 'Directeur',
  avatar: '/avatar2.jpg',
  password: '12'
}, {
  userName: 'Riad Bouaicha',
  role: 'Client',
  avatar: '/avatar3.png',
  password: '13'
}, {
  userName: 'alex bun',
  role: 'Chef de parc',
  avatar: '/avatar4.png',
  password: '14'
}, {
  userName: 'Youpi',
  role: 'Agent de magasin',
  avatar: '/avatar4.png',
  password: '15'
}];
var router = express.Router();

module.exports = function (io) {
  io.on('connection', function (socket) {
    console.log('someone is onligne');
  });
  router.use(chauffeurs());
  router.use(demandes());
  router.use(fournitures());
  router.use(messages(Messages, Users, io));
  router.use(produits());
  router.use(users());
  router.use(vehicules());
  return router;
};