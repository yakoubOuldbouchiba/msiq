const express = require("express");
const router = express.Router();
const jwt = require('jsonwebtoken');

module.exports=()=>{
    //get a list of fournitures
    router.get('/fournitures',(req , res)=>{ 
        res.send({title:'List fournitures'});
    });
    //add a new fourniture
    router.post('/fourniture' , (req , res)=>{
        res.json({title: 'fourniture added'});
    })
    //update a fourniture
    router.put('/fourniture/:id',(req , res)=>{ 
        res.send({title : 'update a fourniture'});
    });
    // delete a user
    router.delete('/fourniture/:id',(req , res)=>{ 
        res.send({method : 'delete a user'});
    });
    return router;
}
