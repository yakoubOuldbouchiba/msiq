const express = require("express");
const router = express.Router();
const dboperationsFournitures = require('../../objects/fournitures/dboperations')
import { error } from 'jquery';
import * as auth from '../../services/auth-service.js'
module.exports=()=>{
    //get a list of fournitures
    router.get('/fournitures',auth.requireLogin,(req , res)=>{ 
       dboperationsFournitures.getObjects().then(result=>{
           console.log(result)
           res.json(result);
       })
    });
    //add a new fourniture
    router.post('/fourniture' ,auth.requireLogin, (req , res)=>{
        console.log(req.body);
        dboperationsFournitures.setObject(req.body).then(result=>{
            res.json(result);
        })
    })
    //update a fourniture
    router.put('/fourniture/:id',auth.requireLogin,(req , res)=>{ 
        dboperationsFournitures.editObject(req.body).then((result ,error)=>{
            res.json(result)
        })
    });
    // delete a user
    router.delete('/fourniture/:id',auth.requireLogin,(req , res)=>{ 
        dboperationsFournitures.deleteObject(req.params.id).then(result=>{
            res.status(200).json( result)
        })
    });
    return router;
}
