const express = require("express");
const router = express.Router();
const dbOperationsDemandes = require('../../objects/demande_vehicule/dboperations.js');
import * as auth from '../../services/auth-service.js'
module.exports=()=>{
    //get a single vehicule
    router.get('/DemandeVehicule/:id',auth.requireLogin,(req , res)=>{ 
        dbOperationsDemandes.getDemandeVehicule(req.params.id)
        .then(result => {
            if(result.result ==='DG'){
                res.status(200).json({
                    title: 'Votre demande client a get',
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
    router.post('/DemandeVehicule',auth.requireLogin , (req , res)=>{
        
        dbOperationsDemandes.setDemandeVehicule( req.body)
            .then(result => {
                if(result.result ==='DI'){
                    res.status(200).json({
                        title: 'Votre demande véhicule a été envoyée',
                        demande_v_id : result.demande_v_id
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
    router.post('/UpdateDemandeVehicule',auth.requireLogin,(req , res)=>{ 
        dbOperationsDemandes.editDemandeVehicule(req.body)
            .then(result => {
                if(result ==='DU'){
                    res.status(200).json({
                        title: 'Voter demande véhicule a été mise à jours'
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
    // delete a demande
    router.delete('/DemandeVehicule/:id',auth.requireLogin,(req , res)=>{ 
        dbOperationsDemandes.deleteDemandeVehicule(req.params.id)
        .then(result => {
            if(result ==='DD'){
                res.status(200).json({
                    title: 'Votre demande véhicule a été supprimée',
                    demande_v_id : result.demande_v_id
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
    return router;
}
