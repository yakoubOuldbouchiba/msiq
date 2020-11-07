const express = require("express");
const router = express.Router();
const dbOperationsDemandes = require('../../objects/DemandeClient/dboeprations');
const jwt = require('jsonwebtoken');
import * as auth from '../../services/auth-service.js'
module.exports=(io)=>{
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
            dbOperationsDemandes.setDemandeClient(
                {
                    uID: decoded.user.email,
                    struct :decoded.user.structure ,
                    rb: req.body
                },
                io)
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
    //update a  demande
    router.post('/UpdateDemandeClient',auth.requireLogin , (req , res)=>{
        jwt.verify((req.headers.authorization || req.headers['Authorization']),'TMPK3Y',
        (err,decoded) => {
            if (err) {
                res.status(500).json({
                    title: 'Quelque chose s\'est mal passé dans le serveur',
                    error: 'CNCTDB' 
                })
            }
            dbOperationsDemandes.updateDemandeClient(req.body , io)
            .then(result => {
                if(result ==='DU'){
                    res.status(200).json({
                        title: 'Voter demande client a été mise à jours'
                    })
                }else if (result ==='CNUD') {
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
    // delete a demande
    router.delete('/DemandeClient/:id/:struct',auth.requireLogin,(req , res)=>{ 
        dbOperationsDemandes.deleteDemandeClient(req.params.id)
        .then(result => {
            if(result.result ==='DD'){
                io.emit("DeleteNofit"+result.recevoir_ID, req.params.id)//for notif
                if(result.typedelete){
                    io.emit(req.params.struct+"DCD",req.params.id)//for repporting CD
                }
                res.status(200).json({
                    title: 'Votre demande client a été supprimée',
                    demande_v_id : result.demande_v_id
                })
            }else if (result ==='CNDD') {
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
    // get a single demande
    router.get('/DemandeClient/:id',auth.requireLogin,(req , res)=>{ 
        dbOperationsDemandes.getDemandeClient(req.params.id)
        .then(result => {
            if(result.result ==='DG'){
                res.status(200).json({
                    title: 'Votre demande client a get',
                    demande : result.demande
                })
            }else if (result ==='CNGD') {
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

    return router;
}