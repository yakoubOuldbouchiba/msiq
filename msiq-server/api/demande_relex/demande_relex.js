const express = require("express");
const router = express.Router();
const dbOperationsDemandes = require('../../objects/demande_relex/dboperations.js');
import * as auth from '../../services/auth-service.js'
module.exports=()=>{
    //get a list of demandes
    router.get('/DemandesRelex',auth.requireLogin,(req , res)=>{ 
        res.send({title : 'List of demandes'});
    });
    //add a new demande
    router.post('/DemandeRelex',auth.requireLogin , (req , res)=>{
        
        dbOperationsDemandes.setDemandeRelex( req.body)
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
    return router;
}
