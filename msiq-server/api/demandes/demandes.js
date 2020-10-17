const express = require("express");
const router = express.Router();
const dbOperationsDemandes = require('../../objects/demandes/dboperations');
const jwt = require('jsonwebtoken');
import * as auth from '../../services/auth-service.js'
module.exports=()=>{
    //get a list of demandes
    router.get('/demandes/:email',auth.requireLogin,(req , res)=>{ 
        dbOperationsDemandes.getDemandes(req.params.email)
        .then(result => {
            if(result.result ==='DG'){
                res.status(200).json({
                    demandes : result.demandes,
                    title: 'Voter demande client a été envoyée'
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
    //update a demande
    router.put('/demande/:id',auth.requireLogin,(req , res)=>{ 
        res.send({method : 'update a demande'});
    });
    // delete a demande
    router.delete('/demande/:id',auth.requireLogin,(req , res)=>{ 
        dbOperationsDemandes.deleteDemande(req.params.id)
        .then(result => {
            if(result ==='DD'){
                res.status(200).json({
                    title: 'Votre demande a été supprimée',
                    
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
