const express = require("express");
const router = express.Router();
const jwt = require('jsonwebtoken');
const dboperationsFournitures = require('../../objects/fournitures/dboperations')
module.exports=()=>{
    //get a list of fournitures
    router.get('/fournitures',(req , res)=>{ 
       dboperationsFournitures.getObjects().then(result=>{
           res.json(result[0]);
       })
    });
    //add a new fourniture
    router.post('/fourniture' , (req , res)=>{
        console.log(req.body);
        dboperationsFournitures.setObject(req.body).then(result=>{
            res.json(result);
        })
    })
    //update a fourniture
    router.put('/fourniture/:id',(req , res)=>{ 
        res.send({title : 'update a fourniture'});
    });
    // delete a user
    router.delete('/fourniture/:id',(req , res)=>{ 
        dboperationsFournitures.deleteObject(req.params.id).then(result=>{
            res.json(result)
        })
    });
    return router;
}
