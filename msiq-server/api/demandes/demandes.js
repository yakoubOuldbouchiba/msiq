const express = require("express");
const router = express.Router();
const dbOperationsDemandes = require('../../objects/demandes/dboperations');
const jwt = require('jsonwebtoken');
import * as auth from '../../services/auth-service.js'
module.exports=()=>{
    //get a list of demandes
    router.get('/demandes',auth.requireLogin,(req , res)=>{ 
        res.send({title : 'List of demandes'});
    });
    //update a demande
    router.put('/demande/:id',auth.requireLogin,(req , res)=>{ 
        res.send({method : 'update a demande'});
    });
    // delete a demande
    router.delete('/demande/:id',auth.requireLogin,(req , res)=>{ 
        res.send({method : 'delete a demande'});
    });
    return router;
}
