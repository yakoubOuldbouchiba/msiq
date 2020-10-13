const express = require("express");
const router = express.Router();
const dbOperationsDemandePriseEnCharge = require('../../objects/DemandePriseEnCharge/dboperations');
const jwt = require('jsonwebtoken');
module.exports=()=>{
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
            let InfoToSend = {
                UserID: decoded.user.email,
                Collegues: req.body.Collegues,
                Destination: req.body.Destination,
                Objet: req.body.Objet,
                StartDate: req.body.StartDate,
                EndDate: req.body.EndDate,
                MoyDeTrans: req.body.MoyenDeTrans,
                HeureDeVol: req.body.HeureDeVol,
                Aeroport: req.body.Aeroport,
            };
            console.log(InfoToSend);
            dbOperationsDemandePriseEnCharge.setDemandePriseEnCharge(InfoToSend)
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
    return router;
}