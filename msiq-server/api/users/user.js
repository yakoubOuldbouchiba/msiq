const express = require("express");
const router = express.Router();
const dbOperationsClient = require('../../objects/users/dboperations.js');
import * as auth from '../../services/auth-service.js'

module.exports=(io)=>{
    //get a list of users
    router.get('/team',auth.requireLogin,(req , res)=>{ 
        dbOperationsClient.getUsers().then(result=>{
            res.send(result[0]);
        }); 
    });
    //get a specific  user
    router.get('/users/:id',auth.requireLogin,(req , res)=>{ 
        dbOperationsClient.getUser(req.params.id).then(result=>{
            res.send(result);
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
                    title: 'Email déja prit ou le compte est désactivé par votre directeu ou quelque information est incorrect. Veuillez verifier vous données',
                    error: 'CNIU'
                })
            } else {
                res.status(401).json({
                    title: 'Quelque chose s\'est mal passé dans le serveur',
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
        dbOperationsClient.deleteUser(req.params.id).then((result,err)=>{
            if(err) return false
            res.send(result);
            io.emit("DeleteCompte"+req.params.id);
        }); 
    });
   // Confirm User
   router.post('/confirm', (req,res) => {
    
    dbOperationsClient.confirm(req.body)
    .then( 
        resu => {
            if (resu === 'G') 
                res.status(200).json({
                    title: 'Votre identité a été bien Confirmée'
                })
            else if (resu == 'WP')
                res.status(401).json({
                    title: 'Mot de pass inccorect',
                    error: 'WP'
                })
            else
                res.status(401).json({
                title: 'Quel que chose est mal passée coté serveur',
                error: 'CNCTDB'
                })
        })
   });
   //changement de mot de pass
   router.post('/changeMDP', (req,res) => {
    dbOperationsClient.changePW(req.body)
    .then( 
        resu => {
        if (resu === 'G') 
            res.status(200).json({
                title: 'Votre mot de passe ont été changé'
            })
        else 
            res.status(401).json({
            title: 'Quel que chose est mal passée coté serveur',
            error: 'CNCTDB'
            })
        })
   });
   //Modifier un utilisateur
   router.post('/updateuser', (req,res) => {
    dbOperationsClient.editUser(req.body)
    .then( 
        resu => {
        if (resu === 'UU') 
            res.status(200).json({
                title: 'Votre informations ont été changé'
            })
        else 
            res.status(401).json({
            title: 'Quel que chose est mal passée coté serveur',
            error: 'CNCTDB'
            })
        })
   })
   return router;
}
