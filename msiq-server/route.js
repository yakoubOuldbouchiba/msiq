const express = require('express')

const chauffeurs = require('./api/chauffeurs/chauffeur.js');
const demandes = require('./api/demandes/demandes.js');
const demande_vehicule = require('./api/demande_vehicule/demande_vehicule.js')
const fournitures = require('./api/fournitures/fourniture.js')
const messages = require('./api/messages/messages.js');
const produits = require('./api/produits/produit.js');
const users = require('./api/users/user');
const vehicules = require('./api/vehicules/vehicules.js');
const DemandeClient = require('./api/DemandeClient/DemandeClient');
const DemandeTirage = require('./api/DemandeTirage/DemandeTirage');

var Messages =[
    {
        sender_ID:'0' ,
        reciever_ID:'1' ,
        content :'bli blo bli blo bli',
        userName:'Yakoub Ould bouchiba',
        avatar:'/avatar1.jpg'
    }
]
var Users =[
    {userName:'Yakoub Ould bouchiba',role:'Chef de parc',avatar:'/avatar1.jpg',password:'11'},
    {userName:'Yacine Lalmi',role:'Directeur',avatar:'/avatar2.jpg',password:'12'},
    {userName:'Riad Bouaicha',role:'Client',avatar:'/avatar3.png',password:'13'},
    {userName:'alex bun',role:'Chef de parc',avatar:'/avatar4.png',password:'14'},
    {userName:'Youpi' , role:'Agent de magasin' , avatar:'/avatar4.png',password:'15'}
 
]
const router = express.Router();

module.exports = (io)=>{
    
    io.on('connection', (socket)=>{
        console.log('someone is onligne');
    })
    router.use(chauffeurs());
    router.use(demandes());
    router.use(demande_vehicule());
    router.use(fournitures());
    router.use(messages(Messages , Users,io));
    router.use(produits());
    router.use(users());
    router.use(vehicules());
    router.use(DemandeClient());
    router.use(DemandeTirage());
    return router
}