const express = require("express");
const router = express.Router();
const jwt = require('jsonwebtoken');
const dboperationChauffeur = require('../../objects/chauffeurs/dboperations')
module.exports=()=>{
    //get a list of chauffeurs
    router.get('/chauffeurs',(req , res)=>{ 
        dboperationChauffeur.getChauffeurs().then(result=>{
            res.json(result[0]);
        })
    });
    //add a new chauffeur
    router.post('/chauffeur' , (req , res)=>{
        dboperationChauffeur.setChauffeur(req.body).then(result=>{
            res.json(result);
        })
    })
    //update a chauffeur
    router.put('/chauffeur/:id',(req , res)=>{ 
        res.send({title : 'update a chauffeur'});
    });
    // delete a chauffeur
    router.delete('/chauffeur/:id',(req , res)=>{ 
        dboperationChauffeur.deleteChauffeur(req.params.id).then(result=>{
            res.json(result);
        })
    });
    return router;
}
