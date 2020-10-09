const express = require("express");
const router = express.Router();
const dboperationChauffeur = require('../../objects/chauffeurs/dboperations')
import * as auth from '../../services/auth-service.js'
module.exports=()=>{
    //get a list of chauffeurs
    router.get('/chauffeurs',auth.requireLogin,(req , res)=>{ 
        dboperationChauffeur.getChauffeurs().then(result=>{
            res.json(result[0]);
        })
    });
    //add a new chauffeur
    router.post('/chauffeur' , auth.requireLogin,(req , res)=>{
        dboperationChauffeur.setChauffeur(req.body).then(result=>{
            res.json(result);
        })
    })
    //update a chauffeur
    router.put('/chauffeur/:id',auth.requireLogin,(req , res)=>{ 
        res.send({title : 'update a chauffeur'});
    });
    // delete a chauffeur
    router.delete('/chauffeur/:id',auth.requireLogin,(req , res)=>{ 
        dboperationChauffeur.deleteChauffeur(req.params.id).then(result=>{
            res.json(result);
        })
    });
    return router;
}
