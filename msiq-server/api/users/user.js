const express = require("express");
const router = express.Router();
const jwt = require('jsonwebtoken');
const dbOperationsClient = require('../../objects/users/dboperations.js');
import * as auth from '../../services/auth-service.js'

module.exports=()=>{
    //get a list of users
    router.get('/team',auth.requireLogin,(req , res)=>{ 
        dbOperationsClient.getUsers().then(result=>{
            res.send(result[0]);
        }); 
    });
    //get a specific  user
    router.get('/users/:id',auth.requireLogin,(req , res)=>{ 
        dbOperationsClient.getUser(req.params.id).then(result=>{
            res.send(result[0]);
        }); 
    });
    //add a new user
    router.post('/register' , (req , res)=>{
        let user = (req.body);
        let result=dbOperationsClient.setUser(user);
        if(result){
            token=jwt.sign(user,'1$$ecret');
            res.json(token);
        }
    })
    //login user
    router.post('/login' , (req , res)=>{
        
        let user  = (req.body);
        dbOperationsClient.Login(user).then(result=>{
            res.json(result);
        })
    })
    //update a user
    router.put('/users/:id',auth.requireLogin,(req , res)=>{ 
        res.send({title : 'update a user'});
    });
    // delete a user
    router.delete('/users/:id',auth.requireLogin,(req , res)=>{ 
        dbOperationsClient.deleteUser(req.params.id).then(result=>{
            res.send(result);
        }); 
    });
    return router;
}
