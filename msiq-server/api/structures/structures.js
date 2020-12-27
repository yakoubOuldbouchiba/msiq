const express = require("express");
const router = express.Router();
const dboperationChauffeur = require('../../objects/structures/dboperations')
import * as auth from '../../services/auth-service.js'
module.exports=()=>{
    //get a list of structures
    router.get('/structure',auth.requireLogin,(req , res)=>{ 
        dboperationChauffeur.getStructures().then(result=>{
            res.json(result[0]);
        })
    });
    //get a list of destinations
    router.get('/destination',auth.requireLogin,(req , res)=>{ 
        dboperationChauffeur.getDestinations().then(result=>{
            res.json(result[0]);
        })
    });
    return router;
}
