const express = require("express");
const router = express.Router();
const jwt = require('jsonwebtoken');

module.exports=()=>{
    //get a list of demandes
    router.get('/demandes',(req , res)=>{ 
        res.send({title : 'List of demandes'});
    });
    //add a new demande
    router.post('/demande' , (req , res)=>{
        res.json({title:'add demande'});
    })
    //update a demande
    router.put('/demande/:id',(req , res)=>{ 
        res.send({method : 'update a demande'});
    });
    // delete a demande
    router.delete('/demande/:id',(req , res)=>{ 
        res.send({method : 'delete a demande'});
    });
    return router;
}
