const express = require("express");
const router = express.Router();
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
        dbOperationsClient.setUser(user)
        .then(result => {
            if(result ==='UI'){
                res.status(200).json({
                    title: 'Voter demande de compte a été envoyée'
                })
            }else if (result ==='CNIU') {
                res.status(401).json({
                    title: 'Email déja prit ou quelque information est incorrect. Veuillez verifier vous données',
                    error: 'CNIU'
                })
            } else {
                res.status(401).json({
                    title: 'quelque chose s\'est mal passé',
                    error: 'CNCTDB' 
                })
            }
        });       

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
