const express = require("express");
const router = express.Router();
const dbOperationsDemandePriseEnCharge = require('../../objects/DemandePriseEnCharge/dboperations');
import * as auth from '../../services/auth-service.js'
const jwt = require('jsonwebtoken');
module.exports=(io)=>{
   //add a new demande
    router.post('/DemandePriseEnCharge' , (req , res)=>{
        jwt.verify((req.headers.authorization || req.headers['Authorization']),'TMPK3Y',
        (err,decoded) => {
            if (err) {
                res.status(500).json({
                    title: 'Quelque chose s\'est mal passé dans le serveur',
                    error: 'Mauvais token' 
                })
            }
            console.log(req.body);
            let InfoToSend = {
                struct : decoded.user.structure,
                UserID: decoded.user.email,
                Collegues: req.body.Collegues,
                Destination: req.body.destination,
                Objet: req.body.objet_mission,
                StartDate: req.body.startDate,
                EndDate: req.body.EndDate,
                MoyDeTrans: req.body.moyen_transport,
                HeureDeVol: req.body.heureDeVol,
                Aeroport: req.body.aeroport,
            };
            //console.log(InfoToSend);
            dbOperationsDemandePriseEnCharge.setDemandePriseEnCharge(InfoToSend,io)
            .then(result => {
                if(result ==='DI'){
                    res.status(200).json({
                        title: 'Voter demande Prise en charge a été envoyée'
                    })
                }else if (result ==='CNID') {
                    res.status(401).json({
                        title: 'Quelque chose s\'est mal passé. Veuillez verifier vous données',
                        error: 'CNID'
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
    router.delete('/DemandePriseEnCharge/:id/:struct',auth.requireLogin,(req , res)=>{ 
        dbOperationsDemandePriseEnCharge.deleteDemandePriseEnCharge(req.params.id)
        .then(result => {
            if(result.result ==='DD'){
                io.emit("DeleteNofit"+result.recevoir_ID, req.params.id)//for notif CD
                if(result.typedelete){
                    io.emit(req.params.struct+"DPD")
                }
                res.status(200).json({
                    title: 'Votre demande prise en charge a été supprimée',
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
    
    // Get a demand
    router.get('/DemandePriseEnCharge/:id',auth.requireLogin, (req , res)=>{
        dbOperationsDemandePriseEnCharge.GetDemandePriseEnCharge(req.params.id)
        .then(result => {
            if(!!result){
                res.status(200).json({
                    title: 'Votre demande prise en charge a été chargée',
                    demande: result
                })
            } else {
                res.status(401).json({
                    title: 'Quelque chose s\'est mal passé dans le serveur',
                    demande: null,
                    error: 'CNCTDB' 
                })
            }
        })
    });
    
    //Edit the demand
    router.post('/UpdateDemandePriseEnCharge',auth.requireLogin, (req , res)=>{
        dbOperationsDemandePriseEnCharge.UpdateDemandePriseEnCharge(req.body , io)
        .then(result => {
            if(result == 'DE'){
                res.status(200).json({
                    title: 'Votre demande prise en charge a été modifier',
                    demande: result
                })
            } else {
                res.status(401).json({
                    title: 'Quelque chose s\'est mal passé dans le serveur',
                    demande: null,
                    error: 'CNCTDB' 
                })
            }
        })
    });   
    return router;
}