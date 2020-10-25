const express = require("express");
const router = express.Router();
const dbOperationsDemandes = require('../../objects/demandes/dboperations');
const jwt = require('jsonwebtoken');
import * as auth from '../../services/auth-service.js'
module.exports=(io)=>{
    //get a list of demandes
    router.get('/demandes/:email',auth.requireLogin,(req , res)=>{ 
        dbOperationsDemandes.getDemandes(req.params.email)
        .then(result => {
            if(result.result ==='DG'){
                res.status(200).json({
                    demandes : result.demandes,
                    title: 'Voter demande client a été envoyée'
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
    //update a demande
    router.put('/demande/:id',auth.requireLogin,(req , res)=>{ 
        res.send({method : 'update a demande'});
    });

    // delete a demande
    router.delete('/demande/:id',auth.requireLogin,(req , res)=>{ 
        dbOperationsDemandes.deleteDemande(req.params.id)
        .then(result => {
            if(result ==='DD'){
                res.status(200).json({
                    title: 'Votre demande a été supprimée',
                    
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
    
    // Liste des demandes à traiter 
    router.get('/demandesATraiter/:UserType/:Depart',auth.requireLogin,(req , res)=>{
        console.log(req.params);
        dbOperationsDemandes.getDemandesATraiter(req.params)
        .then(result => {
            if(!!result){
                res.status(200).json({
                    demandes : result,
                    title: 'Votre demandes ont chargée'
                })
            }else {
                res.status(401).json({
                    title: 'Quelque chose s\'est mal passé dans le serveur',
                    error: 'CNCTDB' 
                })
            }
        })
    });
    
    //Update Demand state
    router.put('/UpdateDemandState/:id',auth.requireLogin,(req , res)=>{ 
        let DID = null
        if (req.body.typeD == 'demande client') 
            DID = req.body.Demande.demande_C_ID
        else if (req.body.typeD == 'demande véhicule') 
            DID = req.body.Demande.demande_V_ID
        else if (req.body.typeD == 'demande fourniture') 
            DID = req.body.Demande.demande_F_ID
        else if (req.body.typeD == 'demande prise en charge') 
            DID = req.body.Demande.demande_P_ID
        else if (req.body.typeD == 'demande tirage') 
            DID = req.body.Demande.demande_T_ID
        else 
            DID = req.body.Demande.demande_R_ID
        
        let Demand = {
            demande_ID: DID,
            demande_Date: req.body.Demande.demande_Date,
            type_demande: req.body.typeD,
            etat: req.body.State,
            motif: '',
        }
        //io.emit('NewDemandCD', Demand )
        dbOperationsDemandes.UpdateDemandState(req.params.id,req.body.State,req.body.motif)
        .then(result => {
            if(result==='DU'){
                res.status(200).json({
                    demandes : result.demandes,
                    title: 'L\'etat de la demande a été modifier'
                })
            }else {
                res.status(401).json({
                    title: 'Quelque chose s\'est mal passé dans le serveur',
                    error: 'CNCTDB' 
                })
            }
        })
        if (req.body.State == 'Acceptee1') 
            io.emit('NewDemandD', Demand )
        else 
            io.emit('NewDemandDDAM', Demand )
        
    });
    return router;
}
