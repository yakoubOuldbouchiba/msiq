var express = require('express');

var chauffeurs = require('./api/chauffeurs/chauffeur.js');

var demandes = require('./api/demandes/demandes.js');

var demande_relex = require('./api/demande_relex/demande_relex.js');

var demande_vehicule = require('./api/demande_vehicule/demande_vehicule.js');

var demande_fourniture = require('./api/demande_fourniture/demande_fourniture.js');

var fournitures = require('./api/fournitures/fourniture.js');

var messages = require('./api/messages/messages.js');

var produits = require('./api/produits/produit.js');

var users = require('./api/users/user');

var vehicules = require('./api/vehicules/vehicules.js');

var DemandeClient = require('./api/DemandeClient/DemandeClient.js');

var DemandeTirage = require('./api/DemandeTirage/DemandeTirage.js');

var reporting = require('./api/reporting/reporting');

var notifications = require('./api/notifications/notification');

var DemandePriseEnCharge = require('./api/DemandePriseEnCharge/DemandePriseEnCharge');

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
  router.use('/api', chauffeurs());
  router.use('/api', demandes(io));
  router.use('/api', demande_relex(io));
  router.use('/api', demande_vehicule(io));
  router.use('/api', demande_fourniture(io));
  router.use('/api', fournitures(io));
  router.use('/api', messages(Messages, Users, io));
  router.use('/api', produits());
  router.use('/api', users(io));
  router.use('/api', reporting());
  router.use('/api', notifications(io));
  router.use('/api', vehicules());
  router.use('/api', DemandeClient(io));
  router.use('/api', DemandeTirage(io));
  router.use('/api', DemandePriseEnCharge(io));
  return router;
};