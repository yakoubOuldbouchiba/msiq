const express = require("express");
const router = express.Router();
const dbOperationsDemandes = require('../../objects/demande_fourniture/dboperations.js');
import * as auth from '../../services/auth-service.js'
module.exports=()=>{
    //get a list of demandes
    router.get('/DemandesFourniture',auth.requireLogin,(req , res)=>{ 
        res.send({title : 'List of demandes'});
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
    return router;
}
