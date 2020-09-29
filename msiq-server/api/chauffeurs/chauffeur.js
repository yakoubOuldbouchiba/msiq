const express = require("express");
const router = express.Router();
const jwt = require('jsonwebtoken');

module.exports=()=>{
    //get a list of chauffeurs
    router.get('/chauffeurs',(req , res)=>{ 
        res.send({title : 'liste chauffeurs'});
    });
    //add a new chauffeur
    router.post('/chauffeur' , (req , res)=>{
        res.send({title : 'new added'});
    })
    //update a chauffeur
    router.put('/chauffeur/:id',(req , res)=>{ 
        res.send({title : 'update a chauffeur'});
    });
    // delete a chauffeur
    router.delete('/chauffeur/:id',(req , res)=>{ 
        res.send({title : 'delete'});
    });
    return router;
}
