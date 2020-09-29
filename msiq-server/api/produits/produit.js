const express = require("express");
const router = express.Router();
const jwt = require('jsonwebtoken');

module.exports=()=>{
    //get a list of produits
    router.get('/produits',(req , res)=>{ 
        res.send({title:'List of produits'});
    });
    //add a produit
    router.post('/produit' , (req , res)=>{
        res.json({title:'add a produit'});
    })
    //update a produit
    router.put('/produit/:id',(req , res)=>{ 
        res.send({title: 'update a user'});
    });
    // delete a produit
    router.delete('/produit/:id',(req , res)=>{ 
        res.send({method : 'delete'});
    });
    return router;
}
