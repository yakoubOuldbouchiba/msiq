const express = require("express");
const router = express.Router();
const dbOperationsDemandes = require('../../objects/demande_relex/dboperations.js');
import * as auth from '../../services/auth-service.js'
module.exports=(io)=>{
    //get a list of demandes
    router.get('/DemandesRelex',auth.requireLogin,(req , res)=>{ 
        res.send({title : 'List of demandes'});
    });
    // get a single demande
    router.get('/DemandeRelex/:id',auth.requireLogin,(req , res)=>{ 
        dbOperationsDemandes.getDemandeRelex(req.params.id)
        .then(result => {
            if(result.result ==='DG'){
                res.status(200).json({
                    title: 'Votre demande relex a get',
                    demande : result.demande
                })
            }else if (result ==='CNGD') {
                res.status(401).json({
                    title: 'Quelque chose s\'est mal passé. Veuillez verifier vous données',
                    error: 'CNIU'
                })
            } else {
                res.status(401).json({
                    title: 'Quelque chose s\'est mal passé dans le serveur',
                    error: 'CNCTDB' 
                })
            }
        })
    });
    //add a new demande
    router.post('/DemandeRelex',auth.requireLogin , (req , res)=>{
        
        dbOperationsDemandes.setDemandeRelex( req.body,io)
            .then(result => {
                if(result ==='DI'){
                    res.status(200).json({
                        title: 'Votre demande activité de relex a été envoyée',
                    })
                }else if (result ==='CNID') {
                    res.status(401).json({
                        title: 'Quelque chose s\'est mal passé. Veuillez verifier vous données',
                        error: 'CNIU'
                    })
                } else {
                    res.status(401).json({
                        title: 'Quelque chose s\'est mal passé dans le serveur',
                        error: 'CNCTDB' 
                    })
                }
            }) 
    });
    //update a demande
    router.put('/DemandeRelex/:id',auth.requireLogin,(req , res)=>{ 
        res.send({method : 'update a demande'});
    });
    // delete a demande
    router.delete('/DemandeRelex/:id',auth.requireLogin,(req , res)=>{ 
        dbOperationsDemandes.deleteDemandeRelex(req.params.id)
        .then(result => {
            if(result ==='DD'){
                res.status(200).json({
                    title: 'Votre demande relex a été supprimée',
                    
                })
            }else if (result ==='CNDD') {
                res.status(401).json({
                    title: 'Quelque chose s\'est mal passé. Veuillez verifier vous données',
                    error: 'CNIU'
                })
            } else {
                res.status(401).json({
                    title: 'Quelque chose s\'est mal passé dans le serveur',
                    error: 'CNCTDB' 
                })
            }
        })
    });
        //update a  demande
        router.post('/UpdateDemandeRelex',auth.requireLogin , (req , res)=>{
            dbOperationsDemandes.editDemandeRelex(req.body)
            .then(result => {
                if(result ==='DU'){
                    res.status(200).json({
                        title: 'Voter demande relex est mise à jours'
                    })
                }else if (result ==='CNUD') {
                    res.status(401).json({
                        title: 'Quelque chose s\'est mal passé. Veuillez verifier vous données',
                        error: 'CNIU'
                    })
                } else {
                    res.status(401).json({
                        title: 'Quelque chose s\'est mal passé dans le serveur',
                        error: 'CNCTDB' 
                    })
                }
            })
        });
    return router;
}
