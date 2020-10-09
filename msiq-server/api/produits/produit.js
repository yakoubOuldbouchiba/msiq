const express = require("express");
const router = express.Router();
const dboperationsProduit = require('../../objects/produits/dboperations')
import * as auth from '../../services/auth-service.js'
module.exports=()=>{
    //get a list of produits
    router.get('/produits',auth.requireLogin,(req , res)=>{ 
        dboperationsProduit.getProduits().then(result=>{
            res.json(result[0]);
        })
    });
    //add a produit
    router.post('/produit' ,auth.requireLogin ,(req , res)=>{
        dboperationsProduit.setProduit(req.body).then(result=>{
            res.json(result);
        })
    })
    //update a produit
    router.put('/produit/:id',auth.requireLogin,(req , res)=>{ 
        res.send({title: 'update a user'});
    });
    // delete a produit
    router.delete('/produit/:id',auth.requireLogin,(req , res)=>{ 
        dboperationsProduit.deleteProduit(req.params.id).then(result=>{
            res.json(result);
        })
    });
    return router;
}
