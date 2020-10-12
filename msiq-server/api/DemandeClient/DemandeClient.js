const express = require("express");
const router = express.Router();
const dbOperationsDemandes = require('../../objects/DemandeClient/dboeprations');
const jwt = require('jsonwebtoken');
import * as auth from '../../services/auth-service.js'
module.exports=()=>{
   //add a new demande
    router.post('/DemandeClient',auth.requireLogin , (req , res)=>{
        jwt.verify((req.headers.authorization || req.headers['Authorization']),'TMPK3Y',
        (err,decoded) => {
            if (err) {
                res.status(500).json({
                    title: 'Quelque chose s\'est mal passé dans le serveur',
                    error: 'CNCTDB' 
                })
            }
            dbOperationsDemandes.setDemandeClient({uID: decoded.user.email, rb: req.body})
            .then(result => {
                if(result ==='DI'){
                    res.status(200).json({
                        title: 'Voter demande client a été envoyée'
                    })
                }else if (result ==='CNID') {
                    res.status(401).json({
                        title: 'Quelque chose s\'est mal passé. Veuillez verifier vous données',
                        error: 'CNIU'
                    })
                } else {
                    res.status(401).json({
                        title: 'Quelque chose s\'est mal passé dans le serveur',
                        error: 'CNCTDB' 
                    })
                }
            })
        });
    })
    return router;
}