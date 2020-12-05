const express = require("express");
var nodemailer = require('nodemailer');
const router = express.Router();
const jwt = require('jsonwebtoken');
const dbOperationsClient = require('../../objects/users/dboperations.js');
import * as auth from '../../services/auth-service.js'

module.exports=(io)=>{
    //get a list of users
    router.get('/team/:struct/:user',auth.requireLogin,(req , res)=>{ 
        dbOperationsClient.getUsers(req.params.struct , req.params.user).then(result=>{
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
                io.emit('NewAccDemande'+req.body.structure,  req.body)
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
    //forget password
    router.post('/forget' , (req , res)=>{
       dbOperationsClient.getUser(req.body.email).then(
            (result , err) =>{
                if(result===undefined || err){
                    res.json({
                        ok : false,
                        title : 'utiliseur n\'est pas'
                    });
                }else{
                    res.status(200).json({
                        ok : true,
                        title : 'vérifiez votre email'
                    });
                    const token = jwt.sign(result , 'KEY/**/Secret' , {expiresIn : '5m'});
                    const ClientURL = 'http://192.168.43.39:8080'
                    var transporter = nodemailer.createTransport({
                        service: 'gmail',
                        auth: {
                          user: 'yakoubouldbouchiba@gmail.com',
                          pass: 'MEFTAHPASSEYAKOUB'
                        }
                      });
                    const data = {
                        from : 'yakoubouldbouchiba@gmail.com',
                        to :req.body.email,
                        subject : 'Lien de réinitialiser mot de pass',
                        html :
                        `
                        <p>
                            <span>veuillez cliquer sur le lien donné pour réinitialiser votre mot de passe</span>
                            <a href="${ClientURL}/ResetPassword/${token}">${ClientURL}/ResetPassword/${token}</a>
                        </p>
                        `
                    }
                    transporter.sendMail(data , function(error, info){
                        if (error) {
                          console.log(error);
                        } else {
                          console.log('Email sent: ' + info.response);
                        }
                    });
                }
            }
        );
        
    })
    //reset de mot de pass
   router.post('/Reset', (req,res) => {
        jwt.verify(req.body.token,'KEY/**/Secret',  function(err){
            if(err) {
                res.status(401).json({
                    title: 'Le lien est mort',
                    error: 'CNCTDB'
                })
            }else{
                let data={
                    UserName:(jwt.decode(req.body.token,'KEY/**/Secret')).email,
                    pw : req.body.pw
                }
                dbOperationsClient.changePW(data)
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
            }
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
   
   router.put('/AccDemande/:email', (req,res) => {
        dbOperationsClient.TAccDemande(req.params.email,req.body.msg)
        .then( 
            resu => {
            if (resu === 'Accept') 
                res.status(200).json({
                    title: 'Demande de compte a ete accepté'
                })
            else if (resu === 'Reject') {
                io.emit("DeleteCompte"+req.params.email);
                res.status(200).json({
                    title: 'Demande de compte a ete rejeté'
                })             
            }        
            else 
                res.status(401).json({
                title: 'Quel que chose est mal passée coté serveur',
                error: 'CNCTDB'
                })
        })
   })
   
   return router;
}
