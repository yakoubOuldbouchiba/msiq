const express = require("express");
const router = express.Router();
import * as auth from '../../services/auth-service.js'
module.exports=()=>{
    //get a list of demandes
    router.get('/demandes',auth.requireLogin,(req , res)=>{ 
        res.send({title : 'List of demandes'});
    });
    //add a new demande
    router.post('/demande' ,auth.requireLogin,(req , res)=>{
        res.json({title:'add demande'});
    })
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
