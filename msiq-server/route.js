const express = require('express')

const chauffeurs = require('./api/chauffeurs/chauffeur.js');
const demandes = require('./api/demandes/demandes.js');
const demande_relex = require('./api/demande_relex/demande_relex.js')
const demande_vehicule = require('./api/demande_vehicule/demande_vehicule.js')
const demande_fourniture = require('./api/demande_fourniture/demande_fourniture.js')
const fournitures = require('./api/fournitures/fourniture.js')
//const messages = require('./api/messages/messages.js');
const produits = require('./api/produits/produit.js');
const users = require('./api/users/user');
const vehicules = require('./api/vehicules/vehicules.js');
const structures = require('./api/structures/structures.js');
const DemandeClient = require('./api/DemandeClient/DemandeClient.js');
const DemandeTirage = require('./api/DemandeTirage/DemandeTirage.js');
const reporting = require('./api/reporting/reporting');
const notifications = require('./api/notifications/notification');
const DemandePriseEnCharge = require('./api/DemandePriseEnCharge/DemandePriseEnCharge')

const router = express.Router();

module.exports = (io)=>{
    
    io.on('connection', (socket)=>{
        console.log('someone is onligne');
    })
    router.use('/api',chauffeurs());
    router.use('/api',demandes(io));
    router.use('/api',demande_relex(io));
    router.use('/api',demande_vehicule(io));
    router.use('/api',demande_fourniture(io));
    router.use('/api',fournitures(io));
    //router.use('/api',messages(Messages , Users,io));
    router.use('/api',produits());
    router.use('/api',users(io));
    router.use('/api',reporting());
    router.use('/api',notifications(io));
    router.use('/api',vehicules());
    router.use('/api',structures());
    router.use('/api',DemandeClient(io));
    router.use('/api',DemandeTirage(io));
    router.use('/api',DemandePriseEnCharge(io));
    return router
}