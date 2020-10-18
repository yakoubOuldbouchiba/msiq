const express = require("express");
const router = express.Router();
const dbOperationsDemandes = require('../../objects/demande_fourniture/dboperations.js');
import * as auth from '../../services/auth-service.js'
module.exports=()=>{
        // get a single demande
        router.get('/DemandeFourniture/:id',auth.requireLogin,(req , res)=>{ 
            dbOperationsDemandes.getDemandeFourniture(req.params.id)
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
    router.post('/DemandeFourniture',auth.requireLogin , (req , res)=>{
        
        dbOperationsDemandes.setDemandeFourniture( req.body)
            .then(result => {
                if(result ==='DI'){
                    res.status(200).json({
                        title: 'Votre demande fourniture a été envoyée'
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
    router.put('/DemandeFourniture/:id',auth.requireLogin,(req , res)=>{ 
        res.send({method : 'update a demande'});
    });
    // delete a demande
    router.delete('/DemandeFourniture/:id',auth.requireLogin,(req , res)=>{ 
        dbOperationsDemandes.deleteDemandeFourniture(req.params.id)
        .then(result => {
            if(result ==='DD'){
                res.status(200).json({
                    title: 'Votre demande fourniture a été supprimée',
                    
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
    router.post('/UpdateDemandeFourniture',auth.requireLogin , (req , res)=>{
        dbOperationsDemandes.editDemandeFourniture(req.body)
        .then(result => {
            if(result ==='DU'){
                res.status(200).json({
                    title: 'Voter demande client a été mise à jours'
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
