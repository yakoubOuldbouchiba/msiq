const express = require("express");
const router = express.Router();
const jwt = require('jsonwebtoken');
const dboperationsProduit = require('../../objects/produits/dboperations')
module.exports=()=>{
    //get a list of produits
    router.get('/produits',(req , res)=>{ 
        dboperationsProduit.getProduits().then(result=>{
            res.json(result[0]);
        })
    });
    //add a produit
    router.post('/produit' , (req , res)=>{
        dboperationsProduit.setProduit(req.body).then(result=>{
            res.json(result);
        })
    })
    //update a produit
    router.put('/produit/:id',(req , res)=>{ 
        res.send({title: 'update a user'});
    });
    // delete a produit
    router.delete('/produit/:id',(req , res)=>{ 
        dboperationsProduit.deleteProduit(req.params.id).then(result=>{
            res.json(result);
        })
    });
    return router;
}
